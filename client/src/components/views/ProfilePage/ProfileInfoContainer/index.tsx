import { useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import { ProfileCard } from '../ProfileCard/index';
import { ProfileUpdateForm } from '../ProfileUpdateForm/index';
import styles from './styles.module.css';

export function ProfileInfoContainer () {
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