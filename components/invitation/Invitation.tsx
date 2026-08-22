import Hero from "@/components/hero/Hero";
import Countdown from "@/components/countdown/Countdown";
import OurStory from "@/components/Ourstory/OurStory";
import WeddingDetails from "@/components/wedding-details/WeddingDetails";
import TraditionalMarriage from "@/components/Traditional-marriage/TraditionalMarriage";
import Gallery from "@/components/Gallery/Gallery";
import RSVP from "@/components/rsvp/RSVP";
import Location from "@/components/location/Location";
import Closing from "@/components/closing/Closing";
import Footer from "@/components/footer/Footer";
import Gifting from "@/components/gifting/Gifting";

type InvitationProps = {
  invitationCode?: string;
};

export default function Invitation({
  invitationCode,
}: InvitationProps) {
  return (
    <>
      <Hero />
      <Countdown />
      <OurStory />
      <WeddingDetails />
      <Location />
      <TraditionalMarriage />
     <Gallery />

<Gifting />

<RSVP invitationCode={invitationCode} />
      <Closing />
      <Footer />
    </>
  );
}