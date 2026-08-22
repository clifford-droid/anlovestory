"use client";

import { FormEvent, useEffect, useState } from "react";

type RSVP = {
  attendance: boolean;
  guests_attending: number;
  guest_names: string | null;
  phone: string | null;
  message: string | null;
  submitted_at: string;
};

type Guest = {
  id: string;
  guest_name: string;
  phone: string | null;
  max_guests: number;
  guest_category: "Regular" | "VIP";
  invitation_code: string;
  rsvp_submitted: boolean;
  created_at: string;
  rsvps: RSVP | null;
};

export default function GuestGeneratorPage() {
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");
  const [guestCategory, setGuestCategory] =
    useState<"Regular" | "VIP">("Regular");

  const [guests, setGuests] = useState<Guest[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedGuest, setSelectedGuest] =
    useState<Guest | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingGuests, setLoadingGuests] =
    useState(true);

  const [error, setError] = useState("");
  const [link, setLink] = useState("");

  async function loadGuests() {
    setLoadingGuests(true);

    try {
      const response = await fetch(
        "/api/admin/guests",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        setGuests([]);
        return;
      }

      const data = await response.json();

      setGuests(data.guests || []);
    } catch {
      setGuests([]);
    } finally {
      setLoadingGuests(false);
    }
  }

  useEffect(() => {
    loadGuests();
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setLink("");

    try {
      const response = await fetch(
        "/api/admin/guests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            guestName,
            phone,
            maxGuests: Number(maxGuests),
            guestCategory,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "Unable to create invitation."
        );

        setLoading(false);
        return;
      }

      const invitationCode =
        data.guest.invitation_code;

      const invitationLink =
        `${window.location.origin}/invite/${invitationCode}`;

      setLink(invitationLink);

      setGuestName("");
      setPhone("");
      setMaxGuests("1");
      setGuestCategory("Regular");

      await loadGuests();
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  }

  async function copyLink(
    invitationCode: string
  ) {
    const invitationLink =
      `${window.location.origin}/invite/${invitationCode}`;

    await navigator.clipboard.writeText(
      invitationLink
    );
  }

  async function deleteGuest(
    guestId: string,
    guestName: string
  ) {
    const confirmed = window.confirm(
      `Delete ${guestName}? This will also remove their RSVP record.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        "/api/admin/guests",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            guestId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
            "Unable to delete guest."
        );
        return;
      }

      if (selectedGuest?.id === guestId) {
        setSelectedGuest(null);
      }

      await loadGuests();
    } catch {
      alert(
        "Something went wrong while deleting the guest."
      );
    }
  }

  function exportGuestList() {
    const headers = [
      "Guest Name",
      "Phone",
      "Guests Allowed",
      "Category",
      "RSVP Status",
      "Guests Attending",
      "Guest Names",
      "Message",
      "RSVP Submitted",
    ];

    const rows = guests.map((guest) => {
      let status = "Pending";

      if (guest.rsvp_submitted) {
        status = guest.rsvps?.attendance
          ? "Attending"
          : "Not Attending";
      }

      return [
        guest.guest_name,
        guest.rsvps?.phone ||
          guest.phone ||
          "",
        guest.max_guests,
        guest.guest_category,
        status,
        guest.rsvps?.guests_attending ??
          "",
        guest.rsvps?.guest_names || "",
        guest.rsvps?.message || "",
        guest.rsvps?.submitted_at
          ? new Date(
              guest.rsvps.submitted_at
            ).toLocaleString()
          : "",
      ];
    });

    const escapeCSV = (
      value: string | number
    ) => {
      const text = String(value).replace(
        /"/g,
        '""'
      );

      return `"${text}"`;
    };

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) =>
        row.map(escapeCSV).join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const anchor =
      document.createElement("a");

    anchor.href = url;
    anchor.download =
      "ANLoveStory-Guest-List.csv";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  }

  function logout() {
    document.cookie =
      "admin_session=; Max-Age=0; path=/";

    window.location.href =
      "/admin/login";
  }

  const attendingCount =
    guests.reduce(
      (total, guest) => {
        if (
          guest.rsvps &&
          guest.rsvps.attendance
        ) {
          return (
            total +
            guest.rsvps.guests_attending
          );
        }

        return total;
      },
      0
    );

  const notAttendingCount =
    guests.filter(
      (guest) =>
        guest.rsvps !== null &&
        guest.rsvps.attendance === false
    ).length;

  const pendingCount =
    guests.filter(
      (guest) =>
        !guest.rsvp_submitted
    ).length;

  const vipCount =
    guests.filter(
      (guest) =>
        guest.guest_category === "VIP"
    ).length;

  const filteredGuests =
    guests.filter((guest) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        guest.guest_name
          .toLowerCase()
          .includes(searchText) ||
        (guest.phone || "")
          .toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "all" ||
        (filter === "attending" &&
          guest.rsvps?.attendance === true) ||
        (filter === "not-attending" &&
          guest.rsvps?.attendance === false) ||
        (filter === "pending" &&
          !guest.rsvp_submitted) ||
        (filter === "vip" &&
          guest.guest_category === "VIP");

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  return (
    <main className="min-h-screen bg-[#FAF8F5] py-10 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-[#D4AF37] text-2xl">
              ✦
            </p>

            <h1 className="text-3xl md:text-4xl text-[#800020]">
              Wedding Guest Manager
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your personalized
              wedding invitations and
              RSVPs.
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="self-start md:self-auto rounded-full border border-[#800020] text-[#800020] px-6 py-2 hover:bg-[#800020] hover:text-white transition"
          >
            LOGOUT
          </button>
        </div>

        {/* STATS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">
              Total Invitations
            </p>

            <p className="text-3xl text-[#800020] mt-2">
              {guests.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">
              Attending
            </p>

            <p className="text-3xl text-green-700 mt-2">
              {attendingCount}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">
              Not Attending
            </p>

            <p className="text-3xl text-red-600 mt-2">
              {notAttendingCount}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="text-3xl text-yellow-600 mt-2">
              {pendingCount}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">
              VIP Guests
            </p>

            <p className="text-3xl text-[#B68A22] mt-2">
              {vipCount}
            </p>
          </div>

        </div>

        {/* CREATE INVITATION */}

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 mb-10">

          <div className="text-center mb-8">
            <p className="text-[#D4AF37] text-2xl">
              ✦
            </p>

            <h2 className="text-2xl md:text-3xl text-[#800020] mt-3">
              Create Guest Invitation
            </h2>

            <p className="mt-2 text-gray-500">
              Generate a unique invitation
              link for each guest.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >

            <div>
              <label
                htmlFor="guestName"
                className="block text-sm text-[#800020] mb-2"
              >
                Guest Name
              </label>

              <input
                id="guestName"
                type="text"
                value={guestName}
                onChange={(e) =>
                  setGuestName(
                    e.target.value
                  )
                }
                placeholder="e.g. Mr. & Mrs. Okafor"
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
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="Guest phone number"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label
                htmlFor="maxGuests"
                className="block text-sm text-[#800020] mb-2"
              >
                Guests Allowed
              </label>

              <select
                id="maxGuests"
                value={maxGuests}
                onChange={(e) =>
                  setMaxGuests(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option value="1">
                  1 Guest
                </option>

                <option value="2">
                  2 Guests
                </option>

                <option value="3">
                  3 Guests
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="guestCategory"
                className="block text-sm text-[#800020] mb-2"
              >
                Guest Category
              </label>

              <select
                id="guestCategory"
                value={guestCategory}
                onChange={(e) =>
                  setGuestCategory(
                    e.target.value as
                      | "Regular"
                      | "VIP"
                  )
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              >
                <option value="Regular">
                  Regular
                </option>

                <option value="VIP">
                  VIP
                </option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#800020] text-white py-3 hover:bg-[#650019] transition disabled:opacity-50"
              >
                {loading
                  ? "GENERATING..."
                  : "GENERATE INVITATION LINK"}
              </button>
            </div>

          </form>

          {error && (
            <p className="mt-6 text-center text-red-600">
              {error}
            </p>
          )}

          {link && (
            <div className="mt-8 rounded-2xl bg-[#FAF8F5] p-5">

              <p className="text-sm text-[#800020] font-medium">
                New invitation link:
              </p>

              <input
                type="text"
                value={link}
                readOnly
                onFocus={(e) =>
                  e.target.select()
                }
                className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
              />

              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(
                    link
                  )
                }
                className="mt-4 w-full rounded-full border border-[#D4AF37] text-[#800020] py-2 hover:bg-white transition"
              >
                COPY LINK
              </button>

            </div>
          )}

        </div>

        {/* SEARCH AND FILTER */}

        <div className="mb-4 flex flex-col md:flex-row gap-3">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search guest name or phone number..."
            className="flex-1 rounded-2xl border border-gray-200 bg-white px-5 py-3 outline-none focus:border-[#D4AF37]"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className="rounded-2xl border border-gray-200 bg-white px-5 py-3 outline-none focus:border-[#D4AF37] text-[#800020]"
          >
            <option value="all">
              All Guests
            </option>

            <option value="attending">
              Attending
            </option>

            <option value="not-attending">
              Not Attending
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="vip">
              VIP Guests
            </option>
          </select>

        </div>

        {/* GUEST LIST */}

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 md:p-8 border-b border-gray-100">

            <div>
              <h2 className="text-2xl text-[#800020]">
                Guest List
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your generated invitations
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={exportGuestList}
                disabled={
                  guests.length === 0
                }
                className="rounded-full bg-[#800020] text-white px-5 py-2 hover:bg-[#650019] transition disabled:opacity-50"
              >
                EXPORT GUEST LIST
              </button>

              <button
                type="button"
                onClick={loadGuests}
                disabled={loadingGuests}
                className="rounded-full border border-[#D4AF37] text-[#800020] px-5 py-2 hover:bg-[#FAF8F5] transition disabled:opacity-50"
              >
                {loadingGuests
                  ? "REFRESHING..."
                  : "REFRESH"}
              </button>

            </div>

          </div>

          {loadingGuests ? (
            <div className="p-10 text-center text-gray-500">
              Loading guests...
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No matching guests found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-[#FAF8F5]">
                  <tr>

                    <th className="px-6 py-4 text-sm text-[#800020]">
                      Guest
                    </th>

                    <th className="px-6 py-4 text-sm text-[#800020]">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-sm text-[#800020]">
                      Guests
                    </th>

                    <th className="px-6 py-4 text-sm text-[#800020]">
                      RSVP
                    </th>

                    <th className="px-6 py-4 text-sm text-[#800020]">
                      Message
                    </th>

                    <th className="px-6 py-4 text-sm text-[#800020]">
                      Invitation
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredGuests.map(
                    (guest) => (
                      <tr
                        key={guest.id}
                        className="border-t border-gray-100"
                      >

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 flex-wrap">

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedGuest(
                                  guest
                                )
                              }
                              className="font-medium text-[#800020] hover:underline text-left"
                            >
                              {guest.guest_name}
                            </button>

                            {guest.guest_category ===
                              "VIP" && (
                              <span className="rounded-full bg-[#D4AF37]/15 px-2 py-1 text-[10px] font-bold tracking-wider text-[#9A7518]">
                                VIP
                              </span>
                            )}

                          </div>

                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(
                              guest.created_at
                            ).toLocaleDateString()}
                          </p>

                        </td>

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {guest.phone ||
                            "—"}
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {guest.max_guests}
                        </td>

                        <td className="px-6 py-5">

                          {!guest.rsvp_submitted ? (
                            <span className="inline-flex rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-xs font-medium">
                              PENDING
                            </span>
                          ) : guest.rsvps
                              ?.attendance ? (
                            <div>

                              <span className="inline-flex rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-medium">
                                ATTENDING
                              </span>

                              <p className="mt-2 text-sm text-gray-600">
                                {
                                  guest
                                    .rsvps
                                    .guests_attending
                                }{" "}
                                attending
                              </p>

                            </div>
                          ) : (
                            <span className="inline-flex rounded-full bg-red-100 text-red-700 px-3 py-1 text-xs font-medium">
                              NOT ATTENDING
                            </span>
                          )}

                        </td>

                        <td className="px-6 py-5 text-sm text-gray-600 max-w-xs">
                          {guest.rsvps
                            ?.message ||
                            "—"}
                        </td>

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                copyLink(
                                  guest.invitation_code
                                )
                              }
                              className="rounded-full bg-[#800020] text-white px-4 py-2 text-xs hover:bg-[#650019] transition"
                            >
                              COPY
                            </button>

                            <a
                              href={`/invite/${guest.invitation_code}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-[#D4AF37] text-[#800020] px-4 py-2 text-xs hover:bg-[#FAF8F5] transition"
                            >
                              VIEW
                            </a>

                            <button
                              type="button"
                              onClick={() =>
                                deleteGuest(
                                  guest.id,
                                  guest.guest_name
                                )
                              }
                              className="rounded-full border border-red-300 text-red-600 px-4 py-2 text-xs hover:bg-red-50 transition"
                            >
                              DELETE
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* RSVP DETAILS POPUP */}

        {selectedGuest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">

            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-xl text-[#D4AF37]">
                    ✦
                  </p>

                  <h2 className="mt-2 text-2xl text-[#800020]">
                    RSVP Details
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedGuest(
                      null
                    )
                  }
                  className="text-2xl text-gray-400 hover:text-[#800020]"
                >
                  ×
                </button>

              </div>

              <div className="mt-6 space-y-4">

                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Guest
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">

                    <p className="font-medium text-[#800020]">
                      {
                        selectedGuest.guest_name
                      }
                    </p>

                    {selectedGuest.guest_category ===
                      "VIP" && (
                      <span className="rounded-full bg-[#D4AF37]/15 px-2 py-1 text-[10px] font-bold tracking-wider text-[#9A7518]">
                        VIP
                      </span>
                    )}

                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Phone
                  </p>

                  <p className="text-gray-600">
                    {selectedGuest
                      .rsvps?.phone ||
                      selectedGuest.phone ||
                      "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Attendance
                  </p>

                  <p className="text-gray-600">
                    {!selectedGuest.rsvp_submitted
                      ? "Pending"
                      : selectedGuest
                          .rsvps
                          ?.attendance
                      ? `Attending — ${selectedGuest.rsvps.guests_attending} guest(s)`
                      : "Not attending"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Guests Allowed
                  </p>

                  <p className="text-gray-600">
                    {
                      selectedGuest.max_guests
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Guest Names
                  </p>

                  <p className="text-gray-600">
                    {selectedGuest
                      .rsvps
                      ?.guest_names ||
                      "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-400">
                    Message
                  </p>

                  <p className="text-gray-600">
                    {selectedGuest
                      .rsvps?.message ||
                      "No message"}
                  </p>
                </div>

                {selectedGuest.rsvps
                  ?.submitted_at && (
                  <div>

                    <p className="text-xs uppercase text-gray-400">
                      RSVP Submitted
                    </p>

                    <p className="text-gray-600">
                      {new Date(
                        selectedGuest
                          .rsvps
                          .submitted_at
                      ).toLocaleString()}
                    </p>

                  </div>
                )}

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedGuest(null)
                }
                className="mt-8 w-full rounded-full bg-[#800020] py-3 text-white hover:bg-[#650019] transition"
              >
                CLOSE
              </button>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}