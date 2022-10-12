import { useState } from 'react'
import { ProfileCard } from '../ProfileCard/index';
import { ProfileUpdateForm } from '../ProfileUpdateForm/index';
import styles from './styles.module.css';

export function ProfileInfoContainer () {

  const [update, setUpdate] = useState(false)

  const updateProfile = () => {
    setUpdate(!update)
  }

  return (
    <div className={styles.profile_info_container}>
      <ProfileCard />
      <button onClick={updateProfile}> Update Profile?</button>
      {update && <ProfileUpdateForm />}
    </div>
  )
}