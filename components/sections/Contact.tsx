import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Let's Work Together</h2>
          <p className={styles.description}>
            Interested in collaborating on projects or discussing opportunities.
            Feel free to reach out.
          </p>
          <a
            href="mailto:amungara@asu.edu"
            className={styles.emailLink}
            aria-label="Send email"
          >
            amungara@asu.edu
          </a>
          <div className={styles.links}>
            <a
              href="https://github.com/AnikethMungara"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
            <span className={styles.divider}>—</span>
            <a
              href="https://www.linkedin.com/in/anikethmungara"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
