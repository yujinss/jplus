# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JPLUS COMS - A static Korean corporate website for J Plus Communications. Single-page application with no build system or package manager.

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript + jQuery 3.6.0
- Swiper 11 (carousel library via CDN)
- Pretendard font (Korean-optimized, via jsDelivr CDN)
- No build tools, bundlers, or package.json

## Development

This is a static website with no build process. To develop:
- Open `index.html` directly in a browser, or serve with any static file server
- All JavaScript is inline in `index.html` (no separate JS files)
- Single CSS file: `css/main.css`

## Project Structure

```
index.html          - Main single-page website (1255 lines)
preparation.html    - Coming soon/placeholder page
css/main.css        - All styling (1566 lines)
images/             - PNG assets (69 files)
```

## Architecture

### Single-Page Layout
All content sections in one HTML file with anchor navigation:
- `#home` - Hero with Swiper carousel
- `#aboutus` - Company info
- `#history` - Timeline slider (2016-2024)
- `#client` - Partner logos
- `#business` / `#mobile_business` - Services
- `#solution` - Tabbed product content
- `#career` - Recruitment
- `#contact` - Contact info

### Responsive Design
- Desktop-first with mobile breakpoint at 1080px
- Uses `.only-desktop` / `.only-mobile` classes for conditional display
- Key breakpoints: 470px, 768px, 1080px, 1920px

### Key JavaScript Patterns

Mobile detection:
```javascript
const isMobile = window.innerWidth <= 1080;
```

Dynamic Swiper slides:
```javascript
function getSlidesPerView() {
    const width = window.innerWidth;
    if (width <= 1080) return 1;
    else return 3;
}
```

Rolling banners use element cloning for infinite scroll effect via `createRollingBanner()` and `createRollingBannerVertical()` functions.

Tab navigation uses `data-tab` attributes to link tabs with content panels.

### CSS Conventions
- Primary colors: #F26A25 (orange), #2766C (navy)
- Section height: 1080px (`.height1080` class)
- Max width: 1920px
- No CSS variables - all values hardcoded
