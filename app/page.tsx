import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Timeline from '@/components/sections/Timeline';
import Achievements from '@/components/sections/Achievements';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
