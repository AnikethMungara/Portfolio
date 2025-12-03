import Navigation from '@/components/ui/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <About />
        <Contact />
      </main>
    </>
  );
}
