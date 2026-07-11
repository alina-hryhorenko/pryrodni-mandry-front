import Hero from '@/components/home/Hero/Hero';
import About from '@/components/About/About';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <About />
      </main>

      <Footer />
    </>
  );
}