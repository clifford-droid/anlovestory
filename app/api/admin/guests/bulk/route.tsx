import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type BulkGuest = {
  guestName?: string;
  phone?: string;
  maxGuests?: number | string;
  guestCategory?: string;
};

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
    ?.match(
      /(?:^|;\s*)admin_session=([^;]+)/
    )?.[1];

  return (
    session &&
    session === process.env.ADMIN_SESSION_TOKEN
  );
}

async function createUniqueInvitationCode() {
  let invitationCode =
    generateInvitationCode();

  let codeExists = true;

  while (codeExists) {
    const { data, error } = await supabase
      .from("guests")
      .select("id")
      .eq(
        "invitation_code",
        invitationCode
      )
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      codeExists = false;
    } else {
      invitationCode =
        generateInvitationCode();
    }
  }

  return invitationCode;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        error: "Unauthorized.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body = await request.json();

    const guests: BulkGuest[] =
      body.guests;

    if (
      !Array.isArray(guests) ||
      guests.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "No guests were provided.",
        },
        {
          status: 400,
        }
      );
    }

    if (guests.length > 1000) {
      return NextResponse.json(
        {
          error:
            "You can import a maximum of 1000 guests at a time.",
        },
        {
          status: 400,
        }
      );
    }

    const preparedGuests = [];

    for (
      let index = 0;
      index < guests.length;
      index++
    ) {
      const row = guests[index];

      const guestName =
        row.guestName?.trim();

      const phone =
        row.phone?.trim() || null;

      const maxGuests =
        Number(row.maxGuests);

      const category =
        row.guestCategory
          ?.trim()
          .toUpperCase();

      if (!guestName) {
        return NextResponse.json(
          {
            error:
              `Row ${index + 2}: Guest Name is required.`,
          },
          {
            status: 400,
          }
        );
      }

      if (
        ![1, 2, 3].includes(maxGuests)
      ) {
        return NextResponse.json(
          {
            error:
              `Row ${index + 2}: Max Guests must be 1, 2, or 3.`,
          },
          {
            status: 400,
          }
        );
      }

      const guestCategory =
        category === "VIP"
          ? "VIP"
          : category === "REGULAR" ||
            !category
          ? "Regular"
          : null;

      if (!guestCategory) {
        return NextResponse.json(
          {
            error:
              `Row ${index + 2}: Category must be VIP or Regular.`,
          },
          {
            status: 400,
          }
        );
      }

      const invitationCode =
        await createUniqueInvitationCode();

      preparedGuests.push({
        guest_name: guestName,
        phone,
        max_guests: maxGuests,
        guest_category:
          guestCategory,
        invitation_code:
          invitationCode,
      });
    }

    const { data, error } =
      await supabase
        .from("guests")
        .insert(preparedGuests)
        .select(`
          id,
          guest_name,
          phone,
          max_guests,
          guest_category,
          invitation_code,
          created_at
        `);

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          error:
            "Unable to import guests.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      imported: data?.length || 0,
      guests: data || [],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while importing the guest list.",
      },
      {
        status: 500,
      }
    );
  }
}