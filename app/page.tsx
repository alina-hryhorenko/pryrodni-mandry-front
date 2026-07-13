import Hero from '@/components/home/Hero/Hero';
import About from '@/components/home/About/About';
import Join from '@/components/home/Join/Join';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Join />
      </main>

      <Footer />
    </>
  );
}
