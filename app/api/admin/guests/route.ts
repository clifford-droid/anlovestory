import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function generateInvitationCode(length = 8) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let i = 0; i < length; i++) {
    code += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return code;
}
export async function GET(request: Request) {
  const session = request.headers.get("cookie")?.match(
    /(?:^|;\s*)admin_session=([^;]+)/
  )?.[1];

  if (
    !session ||
    session !== process.env.ADMIN_SESSION_TOKEN
  ) {
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
  .order("created_at", { ascending: false });

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
export async function POST(request: Request) {const session = request.headers.get("cookie")?.match(
  /(?:^|;\s*)admin_session=([^;]+)/
)?.[1];

if (
  !session ||
  session !== process.env.ADMIN_SESSION_TOKEN
) {
  return NextResponse.json(
    { error: "Unauthorized." },
    { status: 401 }
  );
}
  try {
    const body = await request.json();

    const guestName = body.guestName?.trim();
    const phone = body.phone?.trim();
    const maxGuests = Number(body.maxGuests);

    if (!guestName) {
      return NextResponse.json(
        { error: "Guest name is required." },
        { status: 400 }
      );
    }

    if (![1, 2, 3].includes(maxGuests)) {
      return NextResponse.json(
        { error: "Maximum guests must be 1, 2, or 3." },
        { status: 400 }
      );
    }

    let invitationCode = generateInvitationCode();

    let existingCode = true;

    while (existingCode) {
      const { data } = await supabase
        .from("guests")
        .select("id")
        .eq("invitation_code", invitationCode)
        .maybeSingle();

      if (!data) {
        existingCode = false;
      } else {
        invitationCode = generateInvitationCode();
      }
    }

    const { data, error } = await supabase
      .from("guests")
      .insert({
        guest_name: guestName,
        phone: phone || null,
        max_guests: maxGuests,
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
export async function DELETE(request: Request) {
  const session = request.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)admin_session=([^;]+)/)?.[1];

  if (
    !session ||
    session !== process.env.ADMIN_SESSION_TOKEN
  ) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const guestId = body.guestId;

    if (!guestId) {
      return NextResponse.json(
        { error: "Guest ID is required." },
        { status: 400 }
      );
    }

    // Delete RSVP first
    const { error: rsvpError } = await supabase
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

    // Delete guest
    const { error: guestError } = await supabase
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