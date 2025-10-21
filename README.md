# Caelus Technologies - Company Frontend

A modern, responsive industrial automation company website built with React, Vite, and Tailwind CSS 3.

## Features

- **Modern Tech Stack**: React 19, Vite 6, Tailwind CSS 3
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Dark Mode Support**: Theme switching with persistent preferences
- **Interactive 3D**: Digital Twin visualization using Three.js
- **Modular Components**: Well-organized, reusable component architecture
- **Admin Panel**: Content management capabilities
- **Smooth Animations**: Framer Motion for fluid interactions

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn-style)
│   ├── Navigation.jsx
│   ├── HeroSection.jsx
│   ├── ServicesSection.jsx
│   ├── SoftwareSection.jsx
│   ├── DigitalTwinSection.jsx
│   └── AdminPanel.jsx
├── contexts/           # React contexts
│   ├── ThemeContext.jsx
│   └── AdminContext.jsx
├── hooks/              # Custom React hooks
├── config/             # Configuration files
│   ├── services.json
│   └── softwares.json
├── lib/                # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Hero Section
- Animated gradient background
- Feature pills with icons
- Call-to-action buttons
- Smooth scroll navigation

### Services Section
- Searchable service cards
- Dynamic filtering
- Admin visibility controls
- Statistics display

### Software Section
- Grid of software platforms
- Logo display with fallbacks
- Competency area highlights

### Digital Twin Section
- Interactive 3D visualization
- Real-time controls
- Feature showcase
- Technology stack display

### Admin Panel
- Password-protected access
- Service visibility management
- Content control

## Customization

### Theme Colors
Edit `src/index.css` to customize the color scheme:
- CSS variables for light/dark themes
- HSL color format for easy adjustments

### Content
Update configuration files:
- `src/config/services.json` - Service offerings
- `src/config/softwares.json` - Software platforms

## License

© 2025 Caelus Technologies. All rights reserved.
