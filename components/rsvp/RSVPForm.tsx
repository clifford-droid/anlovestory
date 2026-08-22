"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../section-title/SectionTitle";
import { supabase } from "@/components/lib/supabase";

type Guest = {
  id: string;
  guest_name: string;
  max_guests: number;
  guest_category: "Regular" | "VIP";
  invitation_code: string;
  rsvp_submitted: boolean;
};

type RSVPFormProps = {
  invitationCode: string;
};

export default function RSVPForm({
  invitationCode,
}: RSVPFormProps) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadInvitation() {
      if (!invitationCode) {
        setError("Invalid invitation link.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.rpc(
        "get_invitation_by_code",
        {
          invitation_code_input: invitationCode,
        }
      );

      if (error) {
        console.error(error);
        setError("Unable to load this invitation.");
        setLoading(false);
        return;
      }

      const invitation = data?.[0];

      if (!invitation) {
        setError("This invitation could not be found.");
        setLoading(false);
        return;
      }

      if (invitation.rsvp_submitted) {
        setError(
          "This invitation has already been used to submit an RSVP."
        );
        setLoading(false);
        return;
      }

      setGuest(invitation);
      setName(invitation.guest_name);
      setLoading(false);
    }

    loadInvitation();
  }, [invitationCode]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!guest) return;

    setSubmitting(true);
    setError("");

    const guestCount = Number(guests);

    if (!attendance) {
      setError("Please select your attendance.");
      setSubmitting(false);
      return;
    }

    if (!guests) {
      setError("Please select the number of guests.");
      setSubmitting(false);
      return;
    }

    if (guestCount > guest.max_guests) {
      setError(
        `This invitation allows a maximum of ${guest.max_guests} guest${
          guest.max_guests > 1 ? "s" : ""
        }.`
      );
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.rpc(
      "submit_guest_rsvp",
      {
        invitation_code_input: invitationCode,
        attendance_input: attendance === "yes",
        guests_attending_input: guestCount,
        guest_names_input: name,
        phone_input: phone,
        message_input: message,
      }
    );

    if (error) {
      console.error(error);

      if (
        error.message.includes("RSVP_ALREADY_SUBMITTED")
      ) {
        setError(
          "This invitation has already been used to submit an RSVP."
        );
      } else if (
        error.message.includes("RSVP_DEADLINE_PASSED")
      ) {
        setError(
          "The RSVP period has ended. Thank you for understanding."
        );
      } else if (
        error.message.includes("GUEST_LIMIT_EXCEEDED")
      ) {
        setError(
          `This invitation allows a maximum of ${guest.max_guests} guest${
            guest.max_guests > 1 ? "s" : ""
          }.`
        );
      } else {
        setError(
          "Something went wrong while submitting your RSVP. Please try again."
        );
      }

      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setSubmitting(false);
  }

function downloadAccessCard() {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1000;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const admitted = Number(guests);

  // =========================
  // BACKGROUND
  // =========================

  const bg = ctx.createLinearGradient(
    0,
    0,
    1600,
    1000
  );

  bg.addColorStop(0, "#4A0714");
  bg.addColorStop(0.25, "#7A1026");
  bg.addColorStop(0.55, "#5B0718");
  bg.addColorStop(0.8, "#33030C");
  bg.addColorStop(1, "#160105");

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1600, 1000);

  // =========================
  // GLOSS / SATIN EFFECT
  // =========================

  const gloss = ctx.createLinearGradient(
    0,
    0,
    1100,
    850
  );

  gloss.addColorStop(
    0,
    "rgba(255,255,255,0.20)"
  );
  gloss.addColorStop(
    0.18,
    "rgba(255,255,255,0.08)"
  );
  gloss.addColorStop(
    0.42,
    "rgba(255,255,255,0.02)"
  );
  gloss.addColorStop(
    0.7,
    "rgba(255,255,255,0)"
  );

  ctx.fillStyle = gloss;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(920, 0);
  ctx.lineTo(360, 1000);
  ctx.lineTo(0, 1000);
  ctx.closePath();
  ctx.fill();

  // =========================
  // GOLD SWEEPING CURVES
  // =========================

  const gold = ctx.createLinearGradient(
    0,
    0,
    1600,
    1000
  );

  gold.addColorStop(0, "#8E6816");
  gold.addColorStop(0.22, "#F7DE78");
  gold.addColorStop(0.5, "#C79827");
  gold.addColorStop(0.78, "#FFF0A0");
  gold.addColorStop(1, "#8B6415");

  ctx.strokeStyle = gold;
  ctx.lineWidth = 8;

  ctx.beginPath();
  ctx.moveTo(0, 150);
  ctx.bezierCurveTo(
    130,
    60,
    180,
    90,
    230,
    0
  );
  ctx.stroke();

  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(0, 600);
  ctx.bezierCurveTo(
    260,
    710,
    350,
    920,
    790,
    1000
  );
  ctx.stroke();

  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(0, 575);
  ctx.bezierCurveTo(
    275,
    690,
    390,
    875,
    830,
    1000
  );
  ctx.stroke();

  // =========================
  // SIMPLE GOLD FLORAL MOTIFS
  // =========================

  ctx.strokeStyle = "#D9B441";
  ctx.lineWidth = 2;

  const drawLeaf = (
  x: number,
  y: number,
  scale: number
) => {
  ctx.beginPath();

  ctx.moveTo(x, y);

  ctx.bezierCurveTo(
    x - 30 * scale,
    y - 20 * scale,
    x - 40 * scale,
    y - 65 * scale,
    x,
    y - 85 * scale
  );

  ctx.bezierCurveTo(
    x + 40 * scale,
    y - 65 * scale,
    x + 30 * scale,
    y - 20 * scale,
    x,
    y
  );

  ctx.stroke();
};

  drawLeaf(95, 720, 1);
  drawLeaf(160, 780, 0.8);
  drawLeaf(115, 850, 0.75);
  drawLeaf(205, 890, 0.65);

  // =========================
  // LEFT SIDE
  // =========================

  ctx.textAlign = "center";

  // Large monogram
  ctx.fillStyle = gold;

  ctx.shadowColor =
    "rgba(255,210,80,0.35)";
  ctx.shadowBlur = 12;

  ctx.font = "bold 115px Georgia";

  ctx.fillText(
    "AN",
    390,
    255
  );

  ctx.font = "bold 80px Georgia";

  ctx.fillText(
    "& NJ",
    405,
    340
  );

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  // Couple names
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "italic 56px Georgia";

  ctx.fillText(
    "Angel & Nnamdi",
    410,
    470
  );

  // Gold divider
  ctx.strokeStyle = gold;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(190, 520);
  ctx.lineTo(620, 520);
  ctx.stroke();

  // Family wording
  ctx.fillStyle = "#E7C65E";
  ctx.font = "bold 21px Georgia";

  ctx.fillText(
    "TOGETHER WITH THEIR FAMILIES",
    405,
    575
  );

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "21px Georgia";

  ctx.fillText(
    "JOYFULLY INVITE YOU TO",
    405,
    620
  );

  ctx.fillText(
    "CELEBRATE THEIR LOVE",
    405,
    655
  );

  // =========================
  // RIGHT SIDE TITLE
  // =========================

  ctx.textAlign = "center";

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "46px Georgia";

  ctx.fillText(
    "WEDDING ACCESS CARD",
    1130,
    105
  );

  ctx.strokeStyle = gold;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(820, 135);
  ctx.lineTo(1440, 135);
  ctx.stroke();

  ctx.fillStyle = "#E7C65E";
  ctx.font = "bold 20px Georgia";

  ctx.fillText(
    "THIS CARD ADMITS",
    1130,
    190
  );

  // =========================
// GUEST NAME
// =========================

ctx.fillStyle = "#FFFFFF";

ctx.shadowColor =
  "rgba(255,255,255,0.18)";
ctx.shadowBlur = 6;

// VIP names are slightly smaller because
// "(VIP GUEST)" is added after the guest name.
ctx.font =
  guest?.guest_category === "VIP"
    ? "italic 55px Georgia"
    : "italic 70px Georgia";

const accessCardName =
  guest?.guest_category === "VIP"
    ? `${name} (VIP GUEST)`
    : name;

ctx.fillText(
  accessCardName,
  1130,
  285
);

ctx.shadowColor = "transparent";
ctx.shadowBlur = 0;

// =========================
// GUESTS ADMITTED
// =========================

ctx.fillStyle = "#E7C65E";
ctx.font = "bold 44px Georgia";

ctx.fillText(
  String(admitted),
  975,
  360
);

ctx.fillStyle = "#FFFFFF";
ctx.font = "24px Georgia";

ctx.fillText(
  admitted === 1
    ? "GUEST ADMITTED"
    : "GUESTS ADMITTED",
  1165,
  360
);

  // =========================
  // EVENT DETAILS
  // =========================

  ctx.textAlign = "left";

  // Calendar icon substitute
  ctx.fillStyle = "#D9B441";
  ctx.font = "34px Arial";
  ctx.fillText("▣", 835, 455);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "24px Georgia";

  ctx.fillText(
    "THURSDAY, OCTOBER 1, 2026",
    920,
    455
  );

  ctx.strokeStyle =
    "rgba(212,175,55,0.65)";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(920, 485);
  ctx.lineTo(1390, 485);
  ctx.stroke();

  // Time
  ctx.fillStyle = "#D9B441";
  ctx.font = "35px Arial";
  ctx.fillText("◷", 835, 555);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "27px Georgia";

  ctx.fillText(
    "12 NOON",
    920,
    555
  );

  ctx.beginPath();
  ctx.moveTo(920, 585);
  ctx.lineTo(1390, 585);
  ctx.stroke();

  // Location
  ctx.fillStyle = "#D9B441";
  ctx.font = "35px Arial";
  ctx.fillText("⌖", 835, 655);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "23px Georgia";

  ctx.fillText(
    "NEW PLANET RESORTS EVENT HALL",
    920,
    650
  );

  ctx.font = "20px Georgia";

  ctx.fillText(
    "133/135 Aka Road, Ajangbadi, Ojo, Lagos",
    920,
    685
  );

  // =========================
  // ACCESS CODE
  // =========================

  ctx.textAlign = "center";

  ctx.fillStyle = "#E7C65E";
  ctx.font = "bold 20px Georgia";

  ctx.fillText(
    "ACCESS CODE",
    1130,
    755
  );

  ctx.strokeStyle = gold;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(850, 780);
  ctx.lineTo(1410, 780);
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 42px monospace";

  ctx.fillText(
    invitationCode,
    1130,
    835
  );

  // =========================
  // FOOTER
  // =========================

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "17px Georgia";

  ctx.fillText(
    "PLEASE PRESENT THIS CARD AT THE ENTRANCE ON THE WEDDING DAY",
    1080,
    910
  );

  ctx.fillStyle = "#E7C65E";
  ctx.font = "bold 20px Georgia";

  ctx.fillText(
    "#ANLoveStory",
    1370,
    945
  );

  // =========================
  // DOWNLOAD
  // =========================

  const downloadLink =
    document.createElement("a");

  downloadLink.download =
    `ANLoveStory-Access-Card-${invitationCode}.png`;

  downloadLink.href =
    canvas.toDataURL("image/png", 1);

  downloadLink.click();
}
  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <p className="text-[#800020]">
          Loading your invitation...
        </p>
      </main>
    );
  }

  if (error && !guest) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-[#800020] text-lg">
            {error}
          </p>
        </div>
      </main>
    );
  }

  if (success) {
    const isAttending =
      attendance === "yes";

    return (
      <main className="min-h-screen bg-[#FAF8F5] py-16 px-6 flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="max-w-2xl w-full bg-white rounded-3xl p-10 md:p-14 shadow-lg text-center"
        >
          <div className="text-[#D4AF37] text-3xl mb-5">
            ✦
          </div>

          <h1 className="text-3xl md:text-5xl text-[#800020]">
            Thank You, {name}!
          </h1>

          <p className="mt-5 text-gray-500 leading-relaxed">
            Your RSVP has been received successfully.
          </p>

          {isAttending ? (
            <>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Your wedding access card is ready.
                Please download and keep it safe, as
                it will be required for access to
                the wedding venue.
              </p>

              <button
                type="button"
                onClick={downloadAccessCard}
                className="mt-8 px-10 py-4 rounded-full bg-[#800020] text-white hover:bg-[#650019] transition shadow-md"
              >
                DOWNLOAD ACCESS CARD
              </button>

              <p className="mt-4 text-xs text-gray-400">
                One access card is issued per invitation.
              </p>
            </>
          ) : (
            <p className="mt-4 text-gray-600">
              Thank you for letting Angel & Nnamdi know.
            </p>
          )}

          <p className="mt-8 text-[#D4AF37] tracking-widest">
            #ANLoveStory
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          title="Your RSVP"
          subtitle="We are excited to celebrate this special day with you."
        />

        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
        >
          <div className="mb-8 text-center">
            <p className="text-gray-500">
              We have reserved{" "}
              <span className="text-[#800020] font-medium">
                {guest?.max_guests}
              </span>{" "}
              place
              {guest?.max_guests !== 1 ? "s" : ""} for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label
                htmlFor="name"
                className="block text-sm text-[#800020] mb-2"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Your full name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm text-[#800020] mb-2"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Your phone number"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label
                htmlFor="guests"
                className="block text-sm text-[#800020] mb-2"
              >
                Number of Guests
              </label>

              <select
                id="guests"
                value={guests}
                onChange={(e) =>
                  setGuests(e.target.value)
                }
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option
                  value=""
                  disabled
                >
                  Select number
                </option>

                {Array.from(
                  {
                    length: Math.min(
                      guest?.max_guests ?? 3,
                      3
                    ),
                  },
                  (_, index) =>
                    index + 1
                ).map((number) => (
                  <option
                    key={number}
                    value={number}
                  >
                    {number}{" "}
                    {number === 1
                      ? "Guest"
                      : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="attendance"
                className="block text-sm text-[#800020] mb-2"
              >
                Attendance
              </label>

              <select
                id="attendance"
                value={attendance}
                onChange={(e) =>
                  setAttendance(
                    e.target.value
                  )
                }
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option
                  value=""
                  disabled
                >
                  Please select
                </option>

                <option value="yes">
                  Yes, I will attend
                </option>

                <option value="no">
                  Sorry, I can't attend
                </option>
              </select>
            </div>

          </div>

          <div className="mt-6">
            <label
              htmlFor="message"
              className="block text-sm text-[#800020] mb-2"
            >
              Message
            </label>

            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Leave a message for Angel & Nnamdi..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none resize-none focus:border-[#D4AF37]"
            />
          </div>

          {error && (
            <p className="mt-6 text-center text-red-600 text-sm">
              {error}
            </p>
          )}

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-3 rounded-full bg-[#800020] text-white hover:bg-[#650019] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "SUBMITTING..."
                : "SUBMIT RSVP"}
            </button>
          </div>

        </motion.form>

        <p className="mt-8 text-center text-[#D4AF37] tracking-widest">
          #ANLoveStory
        </p>
      </div>
    </main>
  );
}