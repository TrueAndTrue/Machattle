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
    fontFamily: 'Quantico',
  },
});
