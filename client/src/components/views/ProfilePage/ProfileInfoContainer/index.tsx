import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux';
import Button from "@mui/material/Button";

import { UserContext } from '..';
import { ProfileCard } from '../ProfileCard/index';
import { ProfileUpdateForm } from '../ProfileUpdateForm/index';
import { addFriend, removeFriend } from '../../../../services/userServices';
import styles from './styles.module.css';

export function ProfileInfoContainer () {
  const currentUser = useSelector((state: any) => state.currentUser);
  const otherProfile = useContext(UserContext).user;
  const [update, setUpdate] = useState(false)
  useEffect(() => {},[update])

  const isProfileUser = currentUser.uid == otherProfile.uid
  console.log(isProfileUser)

  const isUserFriend = currentUser.friends.filter((friendId :string) => friendId === otherProfile.uid).length >0

  const updateProfile = () => {
    setUpdate(!update)
  }

  const addFriendToUser = async () => {
    await addFriend(currentUser.uid, otherProfile.uid)
  }

  const removeUserFriend = async () => {
    await removeFriend(currentUser.uid, otherProfile.uid)
  }

  return (
    <div className={styles.profile_info_container}>
      <ProfileCard />
      <div id = {styles.button_container}>
        {isProfileUser && <Button id ={styles.update_profile} onClick={updateProfile}> Update Profile?</Button>}
        {!isProfileUser &&  !isUserFriend  &&  <Button id ={styles.add_friend} onClick ={addFriendToUser}>Add Friend</Button>}
        {!isProfileUser &&  isUserFriend  &&  <Button id ={styles.add_friend}>Remove Friend</Button>}        
      </div>
      {update && <ProfileUpdateForm updateProfile = {updateProfile}/>}
    </div>
  )
}