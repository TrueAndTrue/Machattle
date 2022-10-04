import { LoginButton } from './LoginButton';
import { SignupButton } from './SignupButton';
import { WelcomeMascot } from './WelcomeMascot';
declare module './styles.module.css';

export function LandingPage () {

  return (
    <div className="landing-page-container">
      <WelcomeMascot />
      <SignupButton />
      <LoginButton />
    </div>
  )
}