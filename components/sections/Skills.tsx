import styles from './Skills.module.css';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: [
      'Python',
      'C/C++',
      'JavaScript/TypeScript',
      'Java',
      'SQL',
      'Prolog',
    ],
  },
  {
    title: 'Frameworks & Frontend',
    skills: [
      'React',
      'Next.js',
      'FastAPI',
      'Flask',
      'Node.js',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Backend & Systems',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'Apache Kafka',
      'WebSockets',
    ],
  },
  {
    title: 'ML & Data',
    skills: [
      'PyTorch',
      'Pandas',
      'NumPy',
      'Apache Spark',
      'Scikit-learn',
      'CRDT (Yjs)',
    ],
  },
];

export default function Skills() {
  return (
    <section className={styles.skills} id="skills">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Skills</h2>
          <p className={styles.intro}>
            Technologies and tools I work with to build reliable, scalable software.
          </p>
        </div>

        <div className={styles.grid}>
          {skillCategories.map((category, index) => (
            <div key={index} className={styles.category}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <ul className={styles.skillList}>
                {category.skills.map((skill, i) => (
                  <li key={i} className={styles.skillItem}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
