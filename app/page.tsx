import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import MeetAbol from "@/components/MeetAbol";
import Services from "@/components/Services";
import Story from "@/components/Story";
import VideoStory from "@/components/VideoStory";

export default function Home() {
  return (
    <>
      <Hero />
      <main id="main">
        <Story />
        <VideoStory />
        <Services />
        <MeetAbol />
        <Gallery />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
