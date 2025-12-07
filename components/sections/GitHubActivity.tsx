'use client';
import { GitHubCalendar } from 'react-github-calendar';
import styles from './GitHubActivity.module.css';
export default function GitHubActivity() {
  return (
    <section className={styles.github} id="github">
      <h2 className={styles.heading}>GitHub Activity</h2>

      <div className={styles.card}>
        <GitHubCalendar
          username="AnikethMungara"
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          colorScheme="dark"
        />
      </div>
    </section>
  );
}
