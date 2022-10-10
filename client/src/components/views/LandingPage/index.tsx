import { LoginButton } from './LoginButton';
import { SignupButton } from './SignupButton';
import { WelcomeBanner } from './WelcomeBanner';
import styles from './styles.module.css';
import silver from '../../../assets/Silver.png';
import master from '../../../assets/Master.png'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, getUserById } from '../../../services/userServices';
import { updateLogged } from '../../../state/actions/status';
import { updateUser } from '../../../state/actions/user';


export function LandingPage () {

  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (user && user.sub) {
          const clientUser = await getUserById(user?.sub)
          console.log(clientUser);
          if (clientUser.error === true) {
            const newUser = await addUser(user.sub, 'Hello')
          }
          else {
            dispatch(updateLogged(true));
            dispatch(updateUser(clientUser.res))
            navigate('/home')
          }
          navigate('/home')
        }
        else {
          dispatch(updateLogged(false));
        }
      }
      catch (error) {
        dispatch(updateLogged(false));
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