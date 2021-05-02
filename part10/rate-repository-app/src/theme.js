import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    ligth: '#FFFFFF',
    graylight: '#D8D7D7',
    error: '#d73a4a',
  },
  background: {
    main: '#e1e4e8',
    ligth: '#EFEFEF',
    dark: '#232C33',
    blue: '#1A6FEF',
  },
  borders: {
    normal: 5,
  },
  fontSizes: {
    body: 16,
    subheading: 18,
    head: 20,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
  },
  fontWeigths: {
    normal: '400',
    bold: '700',
  },
  paddings: {
    low: 3,
    normal: 5,
    high: 10,
  },
  margins: {
    low: 5,
    normal: 10,
    high: 15,
  },
};

export default theme;
