# Company Frontend - Setup Guide

## Project Overview

This is a modern React application built with Vite, Tailwind CSS 3, and Three.js for OptiAutomata - an industrial automation solutions provider.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd "d:\R&D business ideas\Our Company\Company-Frontend"
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React 19
- Vite 6
- Tailwind CSS 3
- Framer Motion
- Three.js & React Three Fiber
- Radix UI components
- Lucide React icons
- And more...

### 3. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000` and automatically open in your browser.

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Company-Frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components
│   │   ├── Navigation.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── SoftwareSection.jsx
│   │   ├── DigitalTwinSection.jsx
│   │   ├── DigitalTwin3D.jsx
│   │   └── AdminPanel.jsx
│   ├── contexts/        # React contexts
│   │   ├── ThemeContext.jsx
│   │   └── AdminContext.jsx
│   ├── config/          # Configuration files
│   │   ├── services.json
│   │   └── softwares.json
│   ├── lib/             # Utility functions
│   │   └── utils.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Features

### 🎨 Modern UI/UX
- Responsive design with mobile-first approach
- Dark mode support with theme persistence
- Smooth animations using Framer Motion
- Gradient backgrounds and modern aesthetics

### 🔧 Core Sections
1. **Hero Section** - Eye-catching landing with animated background
2. **Services Section** - Searchable service cards with expand/collapse
3. **Software Section** - Grid of software platforms with logos
4. **Digital Twin Section** - Interactive 3D visualization
5. **Admin Panel** - Password-protected content management

### 🛠️ Technical Features
- **Vite** - Lightning-fast build tool
- **React 19** - Latest React features
- **Tailwind CSS 3** - Utility-first CSS framework
- **Three.js** - 3D graphics rendering
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Production-ready animations

## Configuration

### Theme Customization

Edit `src/index.css` to customize colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* ... more CSS variables */
}
```

### Content Management

Update configuration files:
- `src/config/services.json` - Service offerings
- `src/config/softwares.json` - Software platforms

### Admin Access

Default admin password: **admin123**

Access the admin panel at `#admin` section to:
- Toggle service visibility
- Manage content display
- Control what visitors see

## Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR - changes appear immediately without full page reload.

### Code Organization
- Keep components modular and focused
- Use contexts for global state
- Leverage Tailwind utilities for styling
- Follow the existing component patterns

### Performance
- Components are lazy-loaded where appropriate
- 3D components use Suspense for better UX
- Images have fallbacks for failed loads

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically use the next available port.

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_URL=your_api_url_here
```

Access in code: `import.meta.env.VITE_API_URL`

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Scripts Reference

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Support

For issues or questions:
- Check the README.md
- Review component documentation
- Inspect browser console for errors

## License

© 2025 OptiAutomata. All rights reserved.
