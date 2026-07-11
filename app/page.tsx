import Hero from '@/components/home/Hero/Hero';
import About from '@/components/About/About';
import PopularStories from '@/components/home/PopularStories/PopularStories';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <PopularStories />
    </main>
  );
}
