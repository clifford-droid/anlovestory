import Hero from "@/components/hero/Hero";
import Countdown from "@/components/countdown/Countdown";
import OurStory from "@/components/Ourstory/OurStory";
import WeddingDetails from "@/components/wedding-details/WeddingDetails";
import TraditionalMarriage from "@/components/Traditional-marriage/TraditionalMarriage";
import Gallery from "@/components/Gallery/Gallery";
import RSVP from "@/components/rsvp/RSVP";
import Location from "@/components/location/Location";
import Closing from "@/components/closing/Closing";
import MusicPlayer from "@/components/music/MusicPlayer";
import Footer from "@/components/footer/Footer";

type InvitationProps = {
  invitationCode?: string;
};

export default function Invitation({
  invitationCode,
}: InvitationProps) {
  return (
    <>
      <MusicPlayer />

      <Hero />
      <Countdown />
      <OurStory />
      <WeddingDetails />
      <Location />
      <TraditionalMarriage />
      <Gallery />

      <RSVP invitationCode={invitationCode} />

      <Closing />
      <Footer />
    </>
  );
}