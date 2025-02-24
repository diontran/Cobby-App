import { MD3DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  titleLarge: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.15,
  },
  // Add other font configurations...
};

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FF3366', // MasterClass-like pink/red
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    secondaryContainer: '#2A2A2A',
  },
  fonts: configureFonts({config: fontConfig}),
}; 