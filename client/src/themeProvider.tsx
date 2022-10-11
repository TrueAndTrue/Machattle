import { createTheme, styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EEEEEE',
      light: '#232931'
    },
    secondary: {
      main: '#4ecca3',
      light : '#393E46',
    }
  },
  typography: {
    fontFamily: 'Quantico',
  },
});


export const btnTheme = createTheme({
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
    fontSize: 30,
  },
});