import { notFound } from "next/navigation";
import { supabase } from "@/components/lib/supabase";
import Invitation from "@/components/invitation/Invitation";

type InvitePageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function InvitePage({
  params,
}: InvitePageProps) {
  const { code } = await params;

  const { data, error } = await supabase.rpc(
    "get_invitation_by_code",
    {
      invitation_code_input: code,
    }
  );

  if (error) {
    console.error(error);
    notFound();
  }

  const guest = data?.[0];

  if (!guest) {
    notFound();
  }

  if (guest.rsvp_submitted) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <div className="text-[#D4AF37] text-3xl mb-5">
            ✦
          </div>

          <h1 className="text-3xl md:text-5xl text-[#800020]">
            Invitation Already Used
          </h1>

          <p className="mt-5 text-gray-500 leading-relaxed">
            This invitation has already been used to submit an RSVP.
            Thank you for responding to Nnamdi & Angel.
          </p>

          <p className="mt-6 text-[#D4AF37] tracking-widest">
            #ANLoveStory
          </p>
        </div>
      </main>
    );
  }

  return (
    <Invitation invitationCode={guest.invitation_code} />
  );
}