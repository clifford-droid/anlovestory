"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../section-title/SectionTitle";
import { supabase } from "@/components/lib/supabase";

type Guest = {
  id: string;
  guest_name: string;
  max_guests: number;
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
    return (
      <main className="min-h-screen bg-[#FAF8F5] py-16 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
            We are so excited to celebrate this special
            day with you.
          </p>

          <p className="mt-6 text-[#D4AF37] tracking-widest">
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setPhone(e.target.value)}
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
                onChange={(e) => setGuests(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option value="" disabled>
                  Select number
                </option>

                {Array.from(
                  {
                    length: Math.min(
                      guest?.max_guests ?? 3,
                      3
                    ),
                  },
                  (_, index) => index + 1
                ).map((number) => (
                  <option
                    key={number}
                    value={number}
                  >
                    {number}{" "}
                    {number === 1 ? "Guest" : "Guests"}
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
                  setAttendance(e.target.value)
                }
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option value="" disabled>
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
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a message for Nnamdi & Angel..."
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