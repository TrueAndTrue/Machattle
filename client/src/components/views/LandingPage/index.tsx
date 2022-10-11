import { LoginButton } from './LoginButton';
import { SignupButton } from './SignupButton';
import { WelcomeBanner } from './WelcomeBanner';
import styles from './styles.module.css';
import silver from '../../../assets/Silver.png';
import master from '../../../assets/Master.png'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById, getUserByUsername } from '../../../services/userServices';

export function LandingPage () {

  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (user && user.sub) {
        const returnUser = await getUserById(user?.sub);
        if (returnUser?.error === false) {
          navigate('/home');

        }



      }
      
  })()
  }, [user])

  return (
    <div className={styles.landing_page_container}>
      <WelcomeBanner />
      <div className={styles.landing_page_images}>
        <img src={silver} alt='silver rank logo'/>
        <img src={master} alt='master rank logo'/>
      </div>
      <SignupButton />
      <div className={styles.landing_page_text}>or</div>
      <LoginButton />
    </div>
  )
}