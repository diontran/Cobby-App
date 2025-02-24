import { MD3DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  titleLarge: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
};

// Warm orange-yellow color palette
const colors = {
  primary: '#FFA726', // Main orange
  secondary: '#FFB74D', // Lighter orange
  accent: '#FFD54F', // Warm yellow
  background: '#121212',
  surface: '#1E1E1E',
  surfaceVariant: '#2A2A2A',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  error: '#FF9B7A', // Warmer error color
  onPrimary: '#FFFFFF',
  onBackground: '#FFFFFF',
  onSurface: '#FFFFFF',
  disabled: '#666666',
  placeholder: '#666666',
};

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...colors,
  },
  fonts: configureFonts({ config: fontConfig }),
}; 