"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid password.");
        setLoading(false);
        return;
      }

      router.push("/admin/guests");
    } catch {
      setError("Unable to connect. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="text-[#D4AF37] text-3xl">
            ✦
          </div>

          <h1 className="mt-3 text-3xl text-[#800020]">
            Admin Access
          </h1>

          <p className="mt-3 text-gray-500">
            Enter your password to manage wedding invitations.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-[#800020] mb-2"
            >
              Admin Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />
          </div>

          {error && (
            <p className="text-center text-red-600 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#800020] text-white py-3 hover:bg-[#650019] transition disabled:opacity-50"
          >
            {loading ? "CHECKING..." : "LOGIN"}
          </button>
        </form>
      </div>
    </main>
  );
}