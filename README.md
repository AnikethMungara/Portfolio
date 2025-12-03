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
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

Vercel will automatically detect Next.js and configure everything.

## Customization

### Update Personal Information

Edit the following files to customize content:

- **Hero section**: `components/sections/Hero.tsx` (phrases array)
- **Projects**: `components/sections/Projects.tsx` (projects array)
- **Experience**: `components/sections/Experience.tsx` (experiences array)
- **Education**: `components/sections/Education.tsx` (education array)
- **Skills**: `components/sections/Skills.tsx` (skillCategories array)
- **About**: `components/sections/About.tsx` (paragraph text)
- **Contact**: `components/sections/Contact.tsx` (email and social links)

### Color Palette

All colors are defined in `styles/globals.css`:

```css
--bg: #FFFFFF
--text: #000000
--grey-dark: #111111
--grey-medium: #333333
--grey-light: #777777
--grey-lighter: #DDDDDD
--grey-lightest: #F3F3F3
```

### Typography

Fluid typography uses `clamp()` for responsive scaling. Adjust values in `styles/globals.css`.

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
