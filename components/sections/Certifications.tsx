import styles from './Certifications.module.css';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

const certifications: Certification[] = [
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2024',
    description: 'Neural Networks and Deep Learning',
  },
];

export default function Certifications() {
  return (
    <section className={styles.certifications} id="certifications">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Certifications</h2>
        </div>

        <div className={styles.list}>
          {certifications.map((cert, index) => (
            <article key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.titleGroup}>
                  <h3>{cert.title}</h3>
                  <span className={styles.issuer}>{cert.issuer}</span>
                </div>
                <span className={styles.date}>{cert.date}</span>
              </div>
              {cert.description && (
                <p className={styles.description}>{cert.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
