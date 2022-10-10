import styles from './styles.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button'
import { ThemeProvider } from '@mui/material/styles';
import { btnTheme } from '../../../../themeProvider';

export function SignupButton () {
  

  const { loginWithPopup } = useAuth0();

  return (
    <ThemeProvider theme={btnTheme}>
      <div className={styles.signup_button_container}>
        <Button className={styles.signup_button} onClick={() => loginWithPopup()}> Sign Up </Button>
      </div>
    </ThemeProvider>
  )
}