import Hero from '@/components/home/Hero/Hero';
import About from '@/components/home/About/About';
import Join from '@/components/home/Join/Join';
import PopularStories from '@/components/home/PopularStories/PopularStories';
import OurTravellers from '@/components/home/OurTravellers/OurTravellers';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <PopularStories />
        <About />
        <OurTravellers />
        <Join />
      </main>
      <Footer />
    </>
  );
}
