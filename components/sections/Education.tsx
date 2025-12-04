import styles from './Education.module.css';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  highlights: string[];
}

const education: EducationItem[] = [
  {
    degree: 'B.S. Computer Science',
    institution: 'Arizona State University',
    period: 'Aug 2023 — May 2027',
    highlights: [
      'GPA: 4.0/4.0',
      'Relevant Coursework: Data Structures & Algorithms, Principles of Programming, Principles of Programming Languages, Introduction to Theoretical Computer Science, Operating Systems, Database Management, Software Engineering, Computer Architecture, Machine Learning, Distributed Systems',
      'Section Leader for Arizona State University',
    ],
  },
];

export default function Education() {
  return (
    <section className={styles.education} id="education">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Education</h2>
        </div>

        <div className={styles.list}>
          {education.map((item, index) => (
            <article key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.titleGroup}>
                  <h3>{item.degree}</h3>
                  <span className={styles.institution}>{item.institution}</span>
                </div>
                <span className={styles.period}>{item.period}</span>
              </div>
              <ul className={styles.highlights}>
                {item.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
