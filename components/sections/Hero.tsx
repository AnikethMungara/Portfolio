'use client';
import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const line1 = 'Solving real problems';
  const line2 = 'with code';
  const text = `${line1}\n${line2}`;
  const letters = text.split('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalScrollRange = windowHeight * 1.7;
      const progress = Math.min(Math.max(scrollY / totalScrollRange, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate ghost letters gradually
  const generateGhostLetters = () => {
    const ghosts = [];
    const mainLetters = letters.filter(c => c !== '\n' && c !== ' ');

    // Gradually add ghost letters based on scroll progress (0-20 letters)
    const ghostCount = Math.floor(scrollProgress * 20 );
    for (let i = 0; i < ghostCount; i++) {
      if (mainLetters.length > 0) {
        ghosts.push({
          char: mainLetters[i % mainLetters.length],
          index: i,
        });
      }
    }
    return ghosts;
  };

  const ghostLetters = generateGhostLetters();

  return (
    <section className={styles.hero}>
      {/* Text explosion layer - fixed to viewport */}
      <div
        className={styles.textOverlay}
        style={{
          opacity: scrollProgress >= 1 ? 0 : 1,
          visibility: scrollProgress >= 1 ? 'hidden' : 'visible',
          pointerEvents: 'none',
        }}
      >
        <div className={styles.headline}>
          {letters.map((letter, index) => {
            if (letter === '\n') {
              return <br key={`br-${index}`} />;
            }

            const seed1 = ((index * 12345) % 1000) / 1000;
            const seed2 = ((index * 67890) % 1000) / 1000;
            const seed3 = ((index * 54321) % 1000) / 1000;
            const seed4 = ((index * 98765) % 1000) / 1000;

            // Much wider spread - entire viewport and beyond
            const randomX = seed1 * 2400 - 1200;
            const randomY = seed2 * 1600 - 800;
            const randomRotate = seed3 * 720 - 360;
            const randomScale = 0.2 + seed4 * 0.8;

            const translateX = randomX * scrollProgress;
            const translateY = randomY * scrollProgress;
            const rotate = randomRotate * scrollProgress;
            const scale = 1 - (1 - randomScale) * scrollProgress;
            const opacity = 1; // Keep letters visible throughout

            return (
              <span
                key={`main-${index}`}
                className={styles.letter}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                }}
              >
                {letter}
              </span>
            );
          })}

          {/* Ghost letters that appear gradually during scroll */}
          {ghostLetters.map((ghost) => {
            const seed1 = ((ghost.index * 54321 + 1000) % 1000) / 1000;
            const seed2 = ((ghost.index * 98765 + 2000) % 1000) / 1000;
            const seed3 = ((ghost.index * 13579 + 3000) % 1000) / 1000;
            const seed4 = ((ghost.index * 24680 + 4000) % 1000) / 1000;

            const randomX = seed1 * 3000 - 1500;
            const randomY = seed2 * 1200 - 600;
            const randomRotate = seed3 * 900 - 450;
            const randomScale = 0.3 + seed4 * 0.7;

            // Ghost letters follow same progression as main letters
            const translateX = randomX * scrollProgress;
            const translateY = randomY * scrollProgress;
            const rotate = randomRotate * scrollProgress;
            const scale = 1 - (1 - randomScale) * scrollProgress;

            return (
              <span
                key={`ghost-${ghost.index}`}
                className={styles.letter}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
                  opacity: 1,
                }}
              >
                {ghost.char}
              </span>
            );
          })}
        </div>

        {/* Subtitle below the explosion */}
        <div className={styles.subtitleContainer}>
          <p className={styles.subtitle}>Full Stack Developer</p>
          <p className={styles.subtitle}>AI/ML Engineer</p>
        </div>
      </div>
    </section>
  );
}
