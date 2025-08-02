# Cache Busting Documentation

## Overview

The MIJUG .NET workspace implements comprehensive cache busting to ensure users always receive the latest content and assets, particularly important for the about page with dynamic browser session information.

## Implementation Details

### 1. Page-Level Cache Busting

The about page (`docs/_pages/about.md`) includes cache busting configuration in its front matter:

```yaml
cache_bust: true
cache_version: "{{ site.time | date: '%Y%m%d%H%M%S' }}"
cache_control: "no-cache, no-store, must-revalidate"
```

### 2. Layout-Level Features

The `about-page.html` layout includes:

- **Meta Tags**: HTTP cache control headers
- **Version Display**: Shows last updated timestamp and build version (development mode)
- **JavaScript Cache Busting**: Dynamic version variables and API call utilities

### 3. Asset Cache Busting

All CSS assets include build timestamp parameters:
```html
<link rel="stylesheet" href="/assets/main.css?v=20250801202453" />
```

### 4. JavaScript Utilities

The about page provides cache busting utilities:

```javascript
// Global cache version
const CACHE_VERSION = '20250801202453';

// Utility function to add cache busters to URLs
function addCacheBuster(url) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_v=${CACHE_VERSION}&_t=${Date.now()}`;
}

// Force refresh functionality
window.MIJUG.cacheBust.forceRefresh();
```

### 5. Keyboard Shortcuts

- **Ctrl+Shift+R** (or **Cmd+Shift+R**): Force refresh with new cache parameters

## Configuration

Cache busting is configured in `_config.yml`:

```yaml
cache_bust:
  enabled: true
  version_format: "%Y%m%d%H%M%S"
  assets: true
  pages: true
```

## Usage

### For Developers

1. **Testing Cache Busting**:
   ```bash
   npm run cache:test
   npm run cache:force-rebuild
   ```

2. **Development Mode**: Shows cache version in page header and browser console

3. **Production Mode**: Cache busting active but debug info hidden

### For Users

- **Automatic**: All assets and pages use cache busting automatically
- **Manual**: Use Ctrl+Shift+R to force refresh with new parameters
- **Verification**: About page shows current cache version and last updated time

## Benefits

1. **Always Fresh Content**: Users get latest page content and styling
2. **Browser Session Accuracy**: Dynamic JavaScript always uses latest version
3. **Development Friendly**: Easy to test and verify cache busting
4. **User Control**: Manual refresh option for immediate updates
5. **Performance Tracking**: Version information helps debug caching issues

## Cache Busting Levels

1. **HTTP Headers**: `no-cache, no-store, must-revalidate`
2. **URL Parameters**: `?v=20250801202453&_t=1722631473000`
3. **Meta Tags**: Cache control and version information
4. **JavaScript**: Dynamic cache version variables
5. **Manual**: Force refresh with new parameters

This comprehensive approach ensures that all content, especially the dynamic browser session information on the about page, is always current and properly cached.
