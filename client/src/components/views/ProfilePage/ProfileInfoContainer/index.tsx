import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux';
import { UserContext } from '..';
import Button from "@mui/material/Button";
import { ProfileCard } from '../ProfileCard/index';
import { ProfileUpdateForm } from '../ProfileUpdateForm/index';
import styles from './styles.module.css';

export function ProfileInfoContainer () {
  const currentUser = useSelector((state: any) => state.currentUser);
  const profileUser = useContext(UserContext).user;
  console.log(currentUser == profileUser)

  const [update, setUpdate] = useState(false)
  useEffect(() => {},[update])

  const updateProfile = () => {
    setUpdate(!update)
  }

  return (
    <div className={styles.profile_info_container}>
      <ProfileCard />
      <Button id ={styles.update_profile} onClick={updateProfile}> Update Profile?</Button>
      {update && <ProfileUpdateForm updateProfile = {updateProfile}/>}
    </div>
  )
}