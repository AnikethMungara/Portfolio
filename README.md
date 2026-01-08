# Personal Portfolio Website

A minimalist, Apple-inspired portfolio website built with Next.js and pure CSS.


## Features

- **Apple-inspired minimalist design** with strict black and white palette
- **Special hero section** with:
  - Phrase cycling animation
  - Scroll-triggered 3D letter explosion effect
- **AI-Powered Chatbot** with smart follow-up questions
- **Resume Download** - Generate and download professional PDF resume
- **Fully responsive** design
- **Accessible** with semantic HTML
- **Production-ready** for Vercel deployment

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: CSS Modules (pure CSS, no preprocessors)
- **Language**: TypeScript
- **AI**: Anthropic Claude API (Claude 3.5 Sonnet & Haiku)
- **PDF Generation**: jsPDF
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env.local and add your Anthropic API key
ANTHROPIC_API_KEY=your_api_key_here

# Run development server
npm run dev or just type run
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```



## Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── chatbot/        # AI chatbot endpoints
│   │   │   ├── route.ts
│   │   │   ├── knowledge.ts
│   │   │   └── types.ts
│   │   └── resume/         # Resume generation
│   │       ├── route.ts
│   │       └── data.ts
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Skills.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   └── ui/                 # UI components
│       └── Navigation.tsx
├── docs/                   # Documentation
│   ├── NEW_FEATURES_SUMMARY.md
│   ├── FEATURES_README.md
│   ├── CHATBOT_README.md
│   └── EXAMPLE_COMPONENTS.md
├── styles/
│   └── globals.css         # Global styles
└── package.json
```



## Performance Features

- CSS-only animations for better performance
- GPU-accelerated transforms
- Lazy loading ready
- Minimal JavaScript bundle
- Optimized for Core Web Vitals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion support via `prefers-reduced-motion`
- High contrast black and white palette

## AI Features Documentation

For detailed information about the AI chatbot and resume download features:

- **[Quick Start Guide](docs/NEW_FEATURES_SUMMARY.md)** - Start here for a quick overview
- **[Technical Documentation](docs/FEATURES_README.md)** - Complete API documentation and customization
- **[Example Components](docs/EXAMPLE_COMPONENTS.md)** - Ready-to-use React components with styling
- **[Chatbot Details](docs/CHATBOT_README.md)** - In-depth chatbot configuration

### Quick API Reference

**Chatbot Endpoint:**
```bash
POST /api/chatbot
{
  "message": "What are your skills?",
  "conversationHistory": []
}
```

**Resume Download:**
```bash
GET /api/resume?format=pdf  # Download PDF
GET /api/resume?format=json # Get JSON data
```

## License

MIT License - feel free to use this template for your own portfolio.
