import styles from './Projects.module.css';

interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  github?: string;
  award?: string;
}

const projects: Project[] = [
  {
    title: 'DevSync — Collaborative IDE Platform',
    description: 'Distributed, real-time collaborative IDE with CRDT synchronization and AI-assisted coding.',
    tech: ['Next.js', 'React', 'FastAPI', 'Docker', 'WebSockets', 'CRDT (Yjs)', 'LLM Assist'],
    highlights: [
      'Built a distributed, real-time collaborative IDE using CRDT synchronization with sub-50ms latency',
      'Implemented containerized FastAPI microservices, modular REST endpoints, and persistent environments',
      'Designed an AI-assisted coding workflow with local inference and version-aware completions',
    ],
    github: 'github.com/AnikethMungara/DevSync',
  },
  {
    title: 'CiteSight — AI-Powered Academic Research Discovery',
    description: 'AI research discovery platform with semantic retrieval, document summaries, and contextual Q&A.',
    tech: ['Next.js', 'Gemini API', 'FastAPI', 'PyTorch'],
    highlights: [
      'Built an AI research discovery platform with semantic retrieval, document summaries, and contextual Q&A',
      'Integrated Gemini embeddings and reranking for 90% retrieval accuracy',
      'Achieved 10 req/s throughput with async FastAPI batching and vector caching',
    ],
    github: 'github.com/sreedharsreeram/SunHacks2025',
    award: 'Winner — SunHacks 2025',
  },
  {
    title: "Don'tJustWarnMe — Neural Code Correction Engine",
    description: 'Local ML-powered code corrector that detects and fixes Python bugs in real time.',
    tech: ['Python', 'PyTorch', 'JavaScript/TypeScript', 'FastAPI', 'VS Code API'],
    highlights: [
      'Created a local ML-powered code corrector that detects and fixes Python bugs in real time',
      'Trained a transformer on 20K bug→fix samples; achieved <150ms inference latency',
      'Built a VS Code extension + FastAPI backend for offline developer assistance',
    ],
    github: 'github.com/AnikethMungara/DontJustWarnMe',
  },
  {
    title: 'Mini-SQL Engine — Multithreaded C++ Database',
    description: 'Minimal SQL processor with B+ Tree indexing and thread-safe operator pipeline.',
    tech: ['C++', 'B+ Trees', 'ThreadPool', 'OOP'],
    highlights: [
      'Engineered a minimal SQL processor supporting CREATE, INSERT, SELECT, and in-memory indexing',
      'Built B+ Tree index for fast lookups and a thread-safe operator pipeline using a custom ThreadPool',
      'Achieved 2.3× speedup under 100+ concurrent queries',
    ],
    github: 'github.com/AnikethMungara/Mini-Sql-Engine',
  },
  {
    title: 'Amazon Price Tracker & Hypothesis Testing Tool',
    description: 'Automated price analysis tool studying elasticity and FX-driven variance across regions.',
    tech: ['Python', 'BeautifulSoup', 'Pandas', 'Matplotlib'],
    highlights: [
      'Scraped and analyzed 15+ Amazon US/CA products to study price elasticity and FX-driven variance',
      'Automated a daily ETL workflow with statistical testing and time-series visualization',
      'Identified systematic 5–8% price deviations between regions',
    ],
  },
];

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Projects</h2>
          <p className={styles.intro}>
            A collection of projects that solve real problems with clean, efficient code.
          </p>
        </div>

        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <article key={index} className={styles.project}>
              <div className={styles.projectContent}>
                <div className={styles.projectHeader}>
                  <h3>{project.title}</h3>
                  {project.award && <span className={styles.award}>{project.award}</span>}
                </div>

                <div className={styles.tech}>
                  {project.tech.map((item, i) => (
                    <span key={i} className={styles.techItem}>
                      {item}
                    </span>
                  ))}
                </div>

                <ul className={styles.highlights}>
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>

                {project.github && (
                  <a href={`https://${project.github}`} className={styles.github} target="_blank" rel="noopener noreferrer">
                    GitHub: {project.github}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
