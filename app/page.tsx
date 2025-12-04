import Navigation from '@/components/ui/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Certifications from '@/components/sections/Certifications';
import Skills from '@/components/sections/Skills';
import GitHubActivity from '@/components/sections/GitHubActivity';
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
        <Certifications />
        <Skills />
        <GitHubActivity />
        <About />
        <Contact />
      </main>
    </>
  );
}
