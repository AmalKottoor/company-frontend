# Color Scheme Update - Industrial Theme

## Overview
Updated the website color scheme to match professional industrial/chemical plant websites (inspired by Ballestra S.p.A., GEA, and Merck Group) with full dark/light mode support.

## Changes Made

### 1. Color Palette Updates (`src/index.css`)

#### Light Mode Theme
- **Background**: Clean white/off-white (`98%` lightness)
- **Primary**: Professional blue (`205° 85% 45%`) - inspired by industrial brands
- **Secondary**: Light gray (`210° 15% 92%`)
- **Accent**: Cyan-blue (`195° 75% 50%`)
- **Borders**: Subtle gray (`210° 15% 88%`)
- **Text**: Dark blue-gray (`210° 20% 15%`)

#### Dark Mode Theme
- **Background**: Deep blue-gray (`215° 25% 8%`)
- **Primary**: Bright cyan-blue (`195° 85% 55%`)
- **Secondary**: Dark gray-blue (`215° 15% 18%`)
- **Accent**: Teal (`185° 75% 50%`)
- **Borders**: Subtle dark borders (`215° 15% 22%`)
- **Text**: Light gray (`210° 15% 92%`)

### 2. Component Updates

#### Updated Components:
- **App.jsx**: Changed from hardcoded `bg-black` to theme-aware `bg-background`
- **Navigation.jsx**: Updated all hardcoded colors to use CSS variables
- **HeroSection.jsx**: Removed all `bg-black`, `text-white`, `text-zinc-*` classes
- **ServicesSection.jsx**: Updated from `bg-zinc-950` to `bg-secondary/30`
- **ServiceCard.jsx**: Changed from dark cards to theme-aware cards with proper shadows
- **SoftwareSection.jsx**: Updated from `bg-black` to `bg-background`
- **ContactSection.jsx**: Changed from `bg-zinc-950` to `bg-secondary/30`
- **Footer**: Now uses theme-aware colors
- **Loading Components**: Updated to use theme colors

#### Theme Toggle:
- Already implemented in `Navigation.jsx` (top-right corner)
- Sun icon for dark mode → Moon icon for light mode
- Persists preference in localStorage

### 3. Default Theme
- Changed default from `dark` to `light` mode
- Still respects system preferences and saved user preferences

## Color Reference

### Light Mode
```css
--primary: 205 85% 45%        /* Professional Blue */
--accent: 195 75% 50%         /* Cyan-Blue */
--background: 0 0% 98%        /* Off-White */
--foreground: 210 20% 15%     /* Dark Blue-Gray */
```

### Dark Mode
```css
--primary: 195 85% 55%        /* Bright Cyan-Blue */
--accent: 185 75% 50%         /* Teal */
--background: 215 25% 8%      /* Deep Blue-Gray */
--foreground: 210 15% 92%     /* Light Gray */
```

## Features

✅ **Smooth Transitions**: All color changes animate smoothly
✅ **Persistent Preferences**: Theme choice saved in localStorage
✅ **System Preference Detection**: Respects OS dark/light mode
✅ **Accessible**: Maintains proper contrast ratios
✅ **Professional**: Industrial-grade color scheme
✅ **Consistent**: All components use theme variables

## Testing

To test the theme toggle:
1. Run `npm run dev`
2. Click the theme toggle button (top-right corner)
3. Observe smooth transition between light and dark modes
4. Refresh page - theme preference persists

## Inspiration Sources

- **Ballestra S.p.A.**: Professional blue tones, clean layouts
- **GEA**: Industrial gray-blue palette, modern design
- **Merck Group**: Clean white backgrounds, professional blue accents

## Technical Details

- Uses HSL color format for better manipulation
- Leverages Tailwind CSS custom properties
- Theme context manages state globally
- All components use semantic color tokens (e.g., `bg-background`, `text-foreground`)
