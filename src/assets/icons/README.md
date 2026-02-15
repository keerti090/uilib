# Icon Library

This directory contains SVG icons used throughout the application.

## Available Icons

The following icons are currently available in the local material library:

### Functional Icons
- **icon-building** - Building/organization icon
- **icon-search** - Search/magnifying glass icon
- **icon-add** - Plus/add icon
- **icon-check** - Checkmark icon
- **icon-chevron-right** - Right-pointing chevron/arrow

### Default Icons
- **default-left** - Default left icon (used in button component)
- **default-right** - Default right icon (used in button component)

## Usage

To use an icon in the IconComponent:

```html
<app-icon icon="icon-building" size="md" alt="Building"></app-icon>
```

### Sizes
- `sm` - Small (0.75rem)
- `md` - Medium (1rem) - default
- `lg` - Large (1.5rem)

### Colors
- `default` - Default color
- `primary` - Primary theme color
- `neutral` - Neutral theme color

### Backgrounds
- `default` - Default background
- `primary` - Primary background
- `neutral` - Neutral background

## Adding New Icons

To add a new icon:
1. Create an SVG file in this directory named `icon-{name}.svg`
2. Ensure the SVG uses `currentColor` for the fill/stroke to allow theming
3. Use a 24x24 viewBox for consistency
4. Update this README with the new icon information
