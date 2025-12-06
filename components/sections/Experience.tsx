import styles from './Experience.module.css';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Arizona State University',
    role: 'IT Service Desk Support — W. P. Carey',
    period: 'Mar 2025 — Present',
    description: 'Providing technical support and system management for the W. P. Carey School of Business.',
    achievements: [
      'Resolved 50+ daily support tickets across hardware, software, and network issues with 95% first-call resolution',
      'Managed Active Directory user accounts, group policies, and access permissions for 200+ faculty and staff',
      'Maintained and troubleshot enterprise systems including Zoom Rooms, classroom AV equipment, and Windows/Mac endpoints',
    ],
  },
  {
    company: 'SmartChakra / SonicScape',
    role: 'Data Engineering Intern',
    period: 'May — Aug 2025',
    description: 'Built scalable data pipelines and real-time processing systems for IoT and media platforms.',
    achievements: [
      'Designed an ETL pipeline ingesting 1M+ IoT sensor events/day with Apache Kafka, Spark, and PostgreSQL',
      'Reduced query latency by 40% through partitioning, indexing, and materialized views',
      'Built a real-time anomaly detection system flagging device failures within 2 seconds using sliding-window aggregations',
    ],
  },
  {
    company: 'Arizona State University',
    role: 'Section Leader',
    period: 'Aug 2024 — Dec 2024',
    description: 'Facilitated interactive sessions to support and guide students while fostering a collaborative and engaging environment.',
    achievements: [
      'Facilitated interactive sessions to support and guide students while fostering a collaborative and engaging environment, both online and in-person',
      'Designed and shared relevant materials through digital platforms, ensuring clear communication and alignment with the needs of a diverse audience',
    ],
  },
  {
    company: 'Economic Tech Research',
    role: 'Independent Researcher',
    period: '2022',
    description: 'Conducted economic research analyzing blockchain technologies and their impact on global financial markets.',
    achievements: [
      'Authored "Ethereum and The Future," an economic research study analyzing how blockchain technologies and Ethereum\'s ecosystem could reshape global financial markets through macroeconomic trends',
    ],
  },
  {
    company: 'Youth India Foundation',
    role: 'National Head of VFX',
    period: 'Mar 2021 — Jun 2022',
    description: 'Led VFX production and team management for a youth-led NGO with national reach.',
    achievements: [
      'Led a team of 15 VFX artists to produce 20+ motion graphics and promotional videos, reaching 500K+ viewers',
      'Coordinated cross-functional workflows between design, video, and social media teams',
      'Trained volunteers in Adobe After Effects, Premiere Pro, and Blender',
    ],
  },
];

export default function Experience() {
  return (
    <section className={styles.experience} id="experience">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Experience</h2>
        </div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <article key={index} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.titleGroup}>
                  <h3>{exp.role}</h3>
                  <span className={styles.company}>{exp.company}</span>
                </div>
                <span className={styles.period}>{exp.period}</span>
              </div>
              <p className={styles.description}>{exp.description}</p>
              <ul className={styles.achievements}>
                {exp.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
