import { useAppSelector } from '@/store/hooks';
import { 
  lightTheme, 
  darkTheme, 
  lightHighContrastTheme, 
  darkHighContrastTheme, 
  fontSizeMultipliers 
} from './constants';

// Default fallback theme to prevent undefined errors
const DEFAULT_THEME_COLORS = lightTheme.colors;

/**
 * Hook to return the current color palette based on the user's
 * themeMode preference. This hook reads the `themeMode` value
 * from the Redux preferences state and returns either the light
 * or dark theme colours accordingly. Components can call this
 * hook at render time to derive dynamic colours instead of
 * hard‑coding values. Because it relies on a React hook from
 * the store it must only be invoked within a React component.
 * 
 * SAFETY: Always returns a valid theme object with all required
 * properties to prevent "Cannot read property 'background' of undefined"
 * errors, especially when running on Hermes engine.
 */
export const useThemeColors = () => {
  // Safely retrieve the current theme mode and high contrast setting
  // with fallbacks to prevent undefined access during store initialization
  const themeMode = useAppSelector((s) => s?.preferences?.themeMode) ?? 'light';
  const highContrast = useAppSelector((s) => s?.preferences?.highContrast) ?? false;
  
  try {
    if (highContrast) {
      return themeMode === 'dark' ? darkHighContrastTheme.colors : lightHighContrastTheme.colors;
    }
    
    return themeMode === 'dark' ? darkTheme.colors : lightTheme.colors;
  } catch (error) {
    // Final safety net: if any error occurs, return the default theme
    console.warn('Theme selection error, falling back to default theme:', error);
    return DEFAULT_THEME_COLORS;
  }
};

/**
 * Hook to return the current font size multiplier based on user preferences
 * SAFETY: Always returns a valid multiplier to prevent undefined errors
 */
export const useFontSize = () => {
  const fontSize = useAppSelector((s) => s?.preferences?.fontSize) ?? 'medium';
  return fontSizeMultipliers[fontSize] ?? 1.0;
};

/**
 * Combined hook that returns both colors and font size multiplier
 * SAFETY: Guaranteed to return valid theme configuration
 */
export const useThemeConfig = () => {
  const palette = useThemeColors();
  const fontMultiplier = useFontSize();
  
  return { 
    colors: palette,  // Renamed for clarity 
    palette,          // Keep backward compatibility
    fontMultiplier 
  };
};

/**
 * Type-safe theme colors interface to ensure all required properties exist
 */
export interface ThemeColors {
  background: string;
  text: string;
  primary: string;
  card: string;
  border: string;
  muted: string;
  surface: string;
  secondary: string;
  secondary2: string;
  secondary3: string;
  textSecondary: string;
  error: string;
  error2: string;
  error3: string;
  warning: string;
  success: string;
  success2: string;
  success3: string;
  dark: string;
  dark2: string;
  dark3: string;
}

/**
 * Utility function to safely access theme properties with fallbacks
 * Usage: safeThemeAccess(colors, 'background', '#FFFFFF')
 */
export const safeThemeAccess = (theme: any, property: keyof ThemeColors, fallback: string): string => {
  return theme?.[property] ?? fallback;
};

// Re-export constants for convenience
export { 
  lightTheme, 
  darkTheme, 
  lightHighContrastTheme, 
  darkHighContrastTheme, 
  fontSizeMultipliers 
};

// Интеграция UI Kit
import { typography } from '../ui/typography';
import uiColors from '../ui/colors';
import * as elements from '../ui/elements';

export const Theme = {
  typography,
  palette: uiColors,
  elements,
};

// Для использования: import Theme from 'src/theme/theme';
// Theme.typography, Theme.palette, Theme.elements.Button и т.д.

export default Theme;