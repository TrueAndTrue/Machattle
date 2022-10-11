import { DropdownMenu } from './DropdownMenu/index';
import { LogoutButton } from './LogoutButton/index';
import { Mascot } from './Mascot/index';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavBar () {

  // console.log(pfp, 'in nav')
  const navigate = useNavigate();
  const profile = () => {
    navigate('/profile')
  }
  const leaderBoard = () => {
    navigate('/leaderBoard')
  }

  return (
    <div className={styles.navbar_container}>
      <DropdownMenu />
      <Mascot />
      {/* <Button onClick={nav}>Profile</Button> */}
      <LogoutButton />
    </div>
  )
}