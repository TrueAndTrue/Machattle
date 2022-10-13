import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux';
import Button from "@mui/material/Button";

import { UserContext } from '..';
import { ProfileCard } from '../ProfileCard/index';
import { ProfileUpdateForm } from '../ProfileUpdateForm/index';
import { addFriend } from '../../../../services/userServices';
import styles from './styles.module.css';

export function ProfileInfoContainer () {
  const currentUser = useSelector((state: any) => state.currentUser);
  const otherProfile = useContext(UserContext).user;
  const isProfileUser = currentUser.uid == otherProfile.uid
  console.log(isProfileUser)
  const [update, setUpdate] = useState(false)
  useEffect(() => {},[update])

  const updateProfile = () => {
    setUpdate(!update)
  }

  const addFriendToUser = async () => {
    await addFriend(currentUser.uid, otherProfile.uid)
  }

  return (
    <div className={styles.profile_info_container}>
      <ProfileCard />
      <div id = {styles.button_container}>
        {isProfileUser && <Button id ={styles.update_profile} onClick={updateProfile}> Update Profile?</Button>}
        {!isProfileUser && <Button id ={styles.add_friend} onClick = {addFriendToUser}>Add Friend</Button>}
      </div>
      {update && <ProfileUpdateForm updateProfile = {updateProfile}/>}
    </div>
  )
}