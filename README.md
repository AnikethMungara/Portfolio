# Personal Portfolio Website

A minimalist, Apple-inspired portfolio website built with Next.js and pure CSS.


## Features

- **Apple-inspired minimalist design** with strict black and white palette
- **Special hero section** with:
  - Phrase cycling animation
  - Scroll-triggered 3D letter explosion effect
- **Fully responsive** design
- **Accessible** with semantic HTML
- **Production-ready** for Vercel deployment
- **Zero dependencies** except React and Next.js

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: CSS Modules (pure CSS, no preprocessors)
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install 

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
├── styles/
│   └── globals.css         # Global styles
├── vercel.json            # Vercel configuration
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

## License

MIT License - feel free to use this template for your own portfolio.
