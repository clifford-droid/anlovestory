import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function generateInvitationCode(length = 8) {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < length; i++) {
    code += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return code;
}

function isAuthorized(request: Request) {
  const session = request.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)admin_session=([^;]+)/)?.[1];

  return (
    session &&
    session === process.env.ADMIN_SESSION_TOKEN
  );
}

// ========================================
// GET ALL GUESTS
// ========================================

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("guests")
      .select(`
        id,
        guest_name,
        phone,
        max_guests,
        guest_category,
        invitation_code,
        rsvp_submitted,
        created_at,
        rsvps (
          attendance,
          guests_attending,
          guest_names,
          phone,
          message,
          submitted_at
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Unable to load guests." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      guests: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// ========================================
// CREATE GUEST
// ========================================

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const guestName =
      body.guestName?.trim();

    const phone =
      body.phone?.trim();

    const maxGuests =
      Number(body.maxGuests);

    const guestCategory =
      body.guestCategory === "VIP"
        ? "VIP"
        : "Regular";

    if (!guestName) {
      return NextResponse.json(
        { error: "Guest name is required." },
        { status: 400 }
      );
    }

    if (![1, 2, 3].includes(maxGuests)) {
      return NextResponse.json(
        {
          error:
            "Maximum guests must be 1, 2, or 3.",
        },
        { status: 400 }
      );
    }

    let invitationCode =
      generateInvitationCode();

    let existingCode = true;

    while (existingCode) {
      const { data } = await supabase
        .from("guests")
        .select("id")
        .eq(
          "invitation_code",
          invitationCode
        )
        .maybeSingle();

      if (!data) {
        existingCode = false;
      } else {
        invitationCode =
          generateInvitationCode();
      }
    }

    const { data, error } = await supabase
      .from("guests")
      .insert({
        guest_name: guestName,
        phone: phone || null,
        max_guests: maxGuests,
        guest_category: guestCategory,
        invitation_code: invitationCode,
      })
      .select()
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Unable to create guest." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      guest: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

// ========================================
// EDIT GUEST
// ========================================

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const {
      guestId,
      guestName,
      phone,
      maxGuests,
      guestCategory,
      guestsAttending,
    } = body;

    if (!guestId) {
      return NextResponse.json(
        { error: "Guest ID is required." },
        { status: 400 }
      );
    }

    if (!guestName?.trim()) {
      return NextResponse.json(
        { error: "Guest name is required." },
        { status: 400 }
      );
    }

    const maxGuestsNumber = Number(maxGuests);

    const guestsAttendingNumber =
      guestsAttending === null ||
      guestsAttending === undefined
        ? null
        : Number(guestsAttending);

    if (
      !Number.isInteger(maxGuestsNumber) ||
      ![1, 2, 3].includes(maxGuestsNumber)
    ) {
      return NextResponse.json(
        {
          error:
            "Guests allowed must be between 1 and 3.",
        },
        { status: 400 }
      );
    }

    if (
      guestCategory !== "Regular" &&
      guestCategory !== "VIP"
    ) {
      return NextResponse.json(
        {
          error: "Invalid guest category.",
        },
        { status: 400 }
      );
    }

    const { data: currentGuest, error: guestFetchError } =
      await supabase
        .from("guests")
        .select(
          `
          id,
          guest_name,
          phone,
          max_guests,
          guest_category,
          invitation_code,
          rsvp_submitted
        `
        )
        .eq("id", guestId)
        .single();

    if (guestFetchError || !currentGuest) {
      console.error(
        "GUEST FETCH ERROR:",
        guestFetchError
      );

      return NextResponse.json(
        {
          error: "Guest could not be found.",
        },
        { status: 404 }
      );
    }

    let currentRsvp: {
      attendance: boolean;
      guests_attending: number;
    } | null = null;

    if (currentGuest.rsvp_submitted) {
      const {
        data: rsvpData,
        error: rsvpFetchError,
      } = await supabase
        .from("rsvps")
        .select(
          "attendance, guests_attending"
        )
        .eq("guest_id", guestId)
        .maybeSingle();

      if (rsvpFetchError) {
        console.error(
          "RSVP FETCH ERROR:",
          rsvpFetchError
        );

        return NextResponse.json(
          {
            error:
              "Unable to read this guest's RSVP record.",
          },
          { status: 500 }
        );
      }

      currentRsvp = rsvpData;
    }
if (
  currentGuest.rsvp_submitted &&
  currentRsvp?.attendance === true &&
  guestsAttendingNumber !== null
) {
      if (
        guestsAttendingNumber === null ||
        !Number.isInteger(
          guestsAttendingNumber
        ) ||
        ![1, 2, 3].includes(
          guestsAttendingNumber
        ) ||
        guestsAttendingNumber >
          maxGuestsNumber
      ) {
      return NextResponse.json(
  {
    error:
      "Guests admitted must be between 1 and the Guests Allowed value.",
  },
  { status: 400 }
);
      }

      const {
        data: updatedRsvps,
        error: rsvpUpdateError,
      } = await supabase
        .from("rsvps")
        .update({
          guests_attending:
            guestsAttendingNumber,
        })
        .eq("guest_id", guestId)
        .select(
          "guest_id, guests_attending"
        );

      if (rsvpUpdateError) {
        console.error(
          "RSVP UPDATE ERROR:",
          rsvpUpdateError
        );

        return NextResponse.json(
          {
            error:
              "Unable to update the access-card guest count.",
          },
          { status: 500 }
        );
      }

      if (
        !updatedRsvps ||
        updatedRsvps.length === 0
      ) {
        return NextResponse.json(
          {
            error:
              "No RSVP record was found for this guest.",
          },
          { status: 404 }
        );
      }
    }

    const {
      data: updatedGuest,
      error: guestUpdateError,
    } = await supabase
      .from("guests")
      .update({
        guest_name: guestName.trim(),
        phone: phone?.trim() || null,
        max_guests: maxGuestsNumber,
        guest_category: guestCategory,
      })
      .eq("id", guestId)
      .select()
      .single();

    if (guestUpdateError) {
      console.error(
        "GUEST UPDATE ERROR:",
        guestUpdateError
      );

      return NextResponse.json(
        {
          error: "Unable to update guest.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      guest: updatedGuest,
    });
  } catch (error) {
    console.error(
      "PATCH GUEST ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong while updating the guest.",
      },
      { status: 500 }
    );
  }
}
// ========================================
// DELETE GUEST
// ========================================

export async function DELETE(
  request: Request
) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body =
      await request.json();

    const guestId =
      body.guestId;

    if (!guestId) {
      return NextResponse.json(
        { error: "Guest ID is required." },
        { status: 400 }
      );
    }

    const { error: rsvpError } =
      await supabase
        .from("rsvps")
        .delete()
        .eq("guest_id", guestId);

    if (rsvpError) {
      console.error(rsvpError);

      return NextResponse.json(
        { error: "Unable to delete RSVP." },
        { status: 500 }
      );
    }

    const { error: guestError } =
      await supabase
        .from("guests")
        .delete()
        .eq("id", guestId);

    if (guestError) {
      console.error(guestError);

      return NextResponse.json(
        { error: "Unable to delete guest." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}