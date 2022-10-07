import styles from './styles.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button'

export function LogoutButton () {

  const { loginWithRedirect } = useAuth0();

  return (
    <Button className={styles.logout_button_container} onClick={() => loginWithRedirect()}> Login </Button>
  )
}