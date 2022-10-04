import { LoginButton } from './LoginButton';
import { SignupButton } from './SignupButton';
import { WelcomeMascot } from './WelcomeMascot';
import styles from './styles.module.css';

export function LandingPage () {

  return (
    <div className={styles.landing_page_container}>
      <WelcomeMascot />
      <SignupButton />
      <LoginButton />
    </div>
  )
}