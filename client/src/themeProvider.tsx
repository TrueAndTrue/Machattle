import { createTheme, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EEEEEE',
      light: '#4ECCA3'
    },
    secondary: {
      main: '#232931',
      light : '#393E46',
    }
  },
  typography: {
    fontFamily: 'Quantico, Lato',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Quantico';
          font-style: normal;
          font-weight: 400;
          src: url(https://fonts.gstatic.com/s/quantico/v15/rax-HiSdp9cPL3KIF7xrJD1wmULY.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `,
    }
  }
});
