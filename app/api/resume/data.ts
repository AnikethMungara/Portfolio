export const resumeData = {
  personalInfo: {
    name: 'Aniketh Mungara',
    title: 'Full Stack Developer | AI/ML Engineer',
    email: 'aniketh@example.com', // Update with actual email
    phone: '+1 (XXX) XXX-XXXX', // Update with actual phone
    location: 'Arizona, USA',
    portfolio: 'https://aniketh.dev', // Update with actual portfolio URL
    github: 'github.com/AnikethMungara',
    linkedin: 'linkedin.com/in/aniketh-mungara', // Update with actual LinkedIn
  },

  summary: 'Computer Science student with minors in Business and Data Science. Passionate about creating intuitive, clean, and meaningful software solutions. Experience in full-stack development, AI/ML engineering, and data engineering with a proven track record of building scalable systems and winning hackathons.',

  education: [
    {
      degree: 'B.S. Computer Science',
      institution: 'Arizona State University',
      location: 'Tempe, AZ',
      period: 'Aug 2023 — May 2027',
      gpa: '4.0/4.0',
      minors: 'Business, Data Science',
      coursework: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'Database Management',
        'Machine Learning',
        'Distributed Systems',
        'Software Engineering',
      ],
    },
  ],

  experience: [
    {
      title: 'IT Service Desk Support — W. P. Carey',
      company: 'Arizona State University',
      location: 'Tempe, AZ',
      period: 'Mar 2025 — Present',
      responsibilities: [
        'Resolved 50+ daily support tickets across hardware, software, and network issues with 95% first-call resolution',
        'Managed Active Directory user accounts, group policies, and access permissions for 200+ faculty and staff',
        'Maintained enterprise systems including Zoom Rooms, classroom AV equipment, and Windows/Mac endpoints',
      ],
    },
    {
      title: 'Data Engineering Intern',
      company: 'SmartChakra / SonicScape',
      location: 'Remote',
      period: 'May — Aug 2025',
      responsibilities: [
        'Designed ETL pipeline ingesting 1M+ IoT sensor events/day with Apache Kafka, Spark, and PostgreSQL',
        'Reduced query latency by 40% through partitioning, indexing, and materialized views',
        'Built real-time anomaly detection system flagging device failures within 2 seconds using sliding-window aggregations',
      ],
    },
    {
      title: 'Section Leader',
      company: 'Arizona State University',
      location: 'Tempe, AZ',
      period: 'Aug 2024 — Dec 2024',
      responsibilities: [
        'Facilitated interactive sessions supporting students in collaborative online and in-person environments',
        'Designed and shared learning materials through digital platforms for diverse audiences',
      ],
    },
    {
      title: 'National Head of VFX',
      company: 'Youth India Foundation',
      location: 'Remote',
      period: 'Mar 2021 — Jun 2022',
      responsibilities: [
        'Led team of 15 VFX artists producing 20+ motion graphics and promotional videos, reaching 500K+ viewers',
        'Coordinated cross-functional workflows between design, video, and social media teams',
        'Trained volunteers in Adobe After Effects, Premiere Pro, and Blender',
      ],
    },
  ],

  projects: [
    {
      name: 'DevSync — Collaborative IDE Platform',
      tech: 'Next.js, React, FastAPI, Docker, WebSockets, CRDT (Yjs), LLM Assist',
      achievements: [
        'Built distributed, real-time collaborative IDE using CRDT synchronization with sub-50ms latency',
        'Implemented containerized FastAPI microservices with modular REST endpoints',
        'Designed AI-assisted coding workflow with local inference and version-aware completions',
      ],
    },
    {
      name: 'CiteSight — AI-Powered Research Discovery',
      tech: 'Next.js, Gemini API, FastAPI, PyTorch',
      award: 'Winner — SunHacks 2025',
      achievements: [
        'Built AI research discovery platform with semantic retrieval and contextual Q&A',
        'Integrated Gemini embeddings and reranking for 90% retrieval accuracy',
        'Achieved 10 req/s throughput with async FastAPI batching and vector caching',
      ],
    },
    {
      name: "Don'tJustWarnMe — Neural Code Correction Engine",
      tech: 'Python, PyTorch, JavaScript/TypeScript, FastAPI, VS Code API',
      achievements: [
        'Created local ML-powered code corrector detecting and fixing Python bugs in real time',
        'Trained transformer on 20K bug→fix samples; achieved <150ms inference latency',
        'Built VS Code extension + FastAPI backend for offline developer assistance',
      ],
    },
    {
      name: 'Mini-SQL Engine — Multithreaded C++ Database',
      tech: 'C++, B+ Trees, ThreadPool, OOP',
      achievements: [
        'Engineered minimal SQL processor supporting CREATE, INSERT, SELECT, and in-memory indexing',
        'Built B+ Tree index for fast lookups with thread-safe operator pipeline',
        'Achieved 2.3× speedup under 100+ concurrent queries',
      ],
    },
  ],

  skills: {
    languages: ['Python', 'C/C++', 'JavaScript/TypeScript', 'Java', 'SQL', 'Prolog'],
    frameworks: ['React', 'Next.js', 'FastAPI', 'Flask', 'Node.js', 'Tailwind CSS'],
    backend: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Apache Kafka', 'WebSockets'],
    mlData: ['PyTorch', 'Pandas', 'NumPy', 'Apache Spark', 'Scikit-learn', 'CRDT (Yjs)'],
  },

  certifications: [
    // Add your certifications here if any
  ],

  awards: [
    'Winner — SunHacks 2025 (CiteSight)',
  ],
};

export type ResumeData = typeof resumeData;
