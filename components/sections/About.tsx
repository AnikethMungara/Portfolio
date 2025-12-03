import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>About Me</h2>
          <div className={styles.text}>
            <p>
              I'm a software engineer who believes great code should solve real problems—cleanly, efficiently,
              and without unnecessary complexity. I build systems that scale, from distributed collaborative
              platforms to ML-powered developer tools.
            </p>
            <p>
              Currently studying Computer Science at Arizona State University while working in IT support and
              building projects that push the boundaries of real-time collaboration, AI-assisted coding, and
              data engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
