import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>About Me</h2>
          <div className={styles.text}>
            <p>
              Hi, I'm Aniketh Mungara. I study Computer Science with minors in Business and Data Science, but more importantly, I love creating things that feel intuitive, clean, and meaningful. I'm drawn to projects where logic meets design—where a good idea becomes something real through code, iteration, and creativity. Whether I'm building tools, analyzing data, or experimenting with new technologies, I'm always looking for ways to grow and push my work a little further. This portfolio is a small snapshot of that journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
