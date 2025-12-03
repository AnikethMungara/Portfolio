'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const phrases = [
  'Solving real problems with code'
];

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(1000);
  const heroRef = useRef<HTMLElement>(null);

  // Phrase cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollProgress < 0.1) {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [scrollProgress]);

  // Set viewport height on mount
  useEffect(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Progress from 0 to 1 over 170vh of scrolling
      const totalScrollRange = windowHeight * 1.7;
      const progress = Math.min(Math.max(scrollY / totalScrollRange, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderText = () => {
    const text = phrases[currentPhrase];
    const chars = text.split('');

    // Generate ghost letters for thicker explosion
    const ghostLetters: string[] = [];
    const letters = chars.filter(c => c !== ' ');

    // Add 30+ ghost letters (duplicates + random)
    for (let i = 0; i < 30; i++) {
      if (letters.length > 0) {
        ghostLetters.push(letters[i % letters.length]);
      }
    }

    // Add a few random filler letters
    const fillers = ['a', 'e', 'i', 'o', 'n', 't', 's', 'r'];
    for (let i = 0; i < 10; i++) {
      ghostLetters.push(fillers[i % fillers.length]);
    }

    const allChars = [...chars, ...ghostLetters];

    return allChars.map((char, index) => {
      // Generate consistent random values per character
      const seed1 = ((index * 12345) % 1000) / 1000;
      const seed2 = ((index * 67890) % 1000) / 1000;
      const seed3 = ((index * 54321) % 1000) / 1000;
      const seed4 = ((index * 98765) % 1000) / 1000;

      const isGhost = index >= chars.length;

      // Large random offsets
      const randomX = seed1 * 600 - 300; // -300 to +300
      const randomY = seed2 * 600 - 200; // -200 to +400
      const randomZ = seed3 * 300 - 150; // -150 to +150
      const randomRotate = seed4 * 160 - 80; // -80 to +80

      // Ghost letters appear near the transition point (80-100% of scroll)
      const ghostAppearProgress = isGhost ? Math.max(0, (scrollProgress - 0.8) / 0.2) : 1;

      // Ghost letters start from bottom edge of viewport
      const initialY = isGhost ? viewportHeight * 0.5 : 0;

      return (
        <span
          key={`${currentPhrase}-${index}`}
          className={styles.fragmentChar}
          style={{
            '--scroll-progress': scrollProgress,
            '--random-x': randomX * scrollProgress,
            '--random-y': (randomY * scrollProgress) - (initialY * (1 - ghostAppearProgress)),
            '--random-z': randomZ * scrollProgress,
            '--random-rotate': randomRotate * scrollProgress,
            opacity: isGhost ? ghostAppearProgress * 0.8 : 1 - scrollProgress * 0.3,
          } as React.CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-label="Hero section"
    >
      <div className={styles.content}>
        <h1 className={styles.headline}>
          {renderText()}
        </h1>
      </div>
      <p
        className={styles.subtitle}
        style={{
          opacity: 1 - (scrollProgress * 1.5),
        }}
      >
        Full Stack Developer & Creative Problem Solver
      </p>
      <div
        className={styles.scrollIndicator}
        style={{
          opacity: 1 - (scrollProgress * 1.5),
        }}
      >
        <span className={styles.scrollText}>Scroll to explore</span>
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  );
}
