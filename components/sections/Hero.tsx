'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = 'Solving real problems\nwith code';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(`.${styles.letter}`);
      const footer = footerRef.current;

      // Timeline driven purely by scroll
      const tl = gsap.timeline({
        defaults: { ease: 'none' }
      });

      // 0 → 0.3: footer fades out and drops slightly
      if (footer) {
        tl.to(
          footer,
          {
            opacity: 0,
            y: 20,
            duration: 0.3
          },
          0
        );
      }

      // 0 → 1: characters explode upward and outward
      chars.forEach((char, i) => {
        const seed1 = ((i * 12345) % 1000) / 1000;
        const seed2 = ((i * 67890) % 1000) / 1000;
        const seed3 = ((i * 54321) % 1000) / 1000;
        const seed4 = ((i * 98765) % 1000) / 1000;

        const randomX = seed1 * 600 - 300;
        const randomY = -(seed2 * 450 + 150);
        const randomZ = seed3 * 240 - 120;
        const randomRotate = seed4 * 160 - 80;

        tl.to(
          char,
          {
            x: randomX,
            y: randomY,
            z: randomZ,
            rotation: randomRotate,
            duration: 1
          },
          0
        );
      });

      // Rising floor animation (starts at 0.7)
      tl.to(
        containerRef.current,
        {
          '--floor-progress': 1,
          duration: 0.3
        } as any,
        0.7
      );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=22%', // 45% faster - reduced from 40%
        scrub: true,
        pin: true,
        animation: tl
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Render headline as spans, preserving spaces + line breaks
  const renderHeadline = () => {
    const elements: React.ReactNode[] = [];
    let key = 0;

    for (const ch of HEADLINE) {
      if (ch === '\n') {
        elements.push(<br key={`br-${key++}`} />);
      } else if (ch === ' ') {
        elements.push(
          <span key={`sp-${key++}`} className={styles.letter}>
            {'\u00A0'}
          </span>
        );
      } else {
        elements.push(
          <span key={`ch-${key++}`} className={styles.letter}>
            {ch}
          </span>
        );
      }
    }
    return elements;
  };

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.textOverlay}>
        <div className={styles.headline}>{renderHeadline()}</div>

        <div ref={footerRef} className={styles.subtitleContainer}>
          <p className={styles.subtitle}>Full Stack Developer</p>
          <p className={styles.subtitle}>AI/ML Engineer</p>
        </div>
      </div>
    </section>
  );
}
