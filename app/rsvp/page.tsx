import RSVPForm from "@/components/rsvp/RSVPForm";
import MusicPlayer from "@/components/music/MusicPlayer";

type RSVPPageProps = {
  searchParams: Promise<{
    code?: string;
  }>;
};

export default async function RSVPPage({
  searchParams,
}: RSVPPageProps) {
  const params = await searchParams;
  const invitationCode = params.code;

  if (!invitationCode) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl text-[#800020]">
            Invitation Not Found
          </h1>

          <p className="mt-4 text-gray-500">
            This RSVP link is missing its invitation code.
          </p>
        </div>
      </main>
    );
  }

  return (
  <>
    <MusicPlayer />
    <RSVPForm invitationCode={invitationCode} />
  </>
);}