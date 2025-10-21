# Caelus Technologies Logo

## Logo Files

- **caelus-logo.svg** - Main SVG logo (scalable, used as favicon)
- **Logo.jsx** - React component for use in the application

## Logo Design

The Caelus Technologies logo features:
- **Stylized "C"** representing the company name
- **Celestial elements** (stars/dots) symbolizing "Caelus" (Latin for "sky/heaven")
- **Gradient colors** from cyan to purple matching the brand theme
- **Modern, tech-focused aesthetic** suitable for industrial automation

## Usage in Components

### Import the Logo Component
```jsx
import Logo from './components/Logo';
```

### Basic Usage
```jsx
<Logo size={40} showText={true} animated={true} />
```

### Props
- `size` (number): Size of the logo icon in pixels (default: 40)
- `showText` (boolean): Show company name text (default: true)
- `className` (string): Additional CSS classes
- `animated` (boolean): Enable entrance animation (default: true)

## Color Scheme

- **Primary Cyan**: #00ffff
- **Sky Blue**: #0ea5e9
- **Purple Accent**: #a855f7

## Locations Used

1. **Navigation Sidebar** - Full logo with text
2. **Hero Section** - Large icon-only version
3. **Footer** - Full logo with text
4. **Favicon** - SVG icon
5. **PWA Manifest** - App icon

## Notes

To generate PNG versions for better compatibility:
1. Open caelus-logo.svg in a vector graphics editor (Inkscape, Adobe Illustrator)
2. Export as PNG at 192x192 and 512x512 for PWA requirements
3. Update manifest.json with PNG icon references if needed
