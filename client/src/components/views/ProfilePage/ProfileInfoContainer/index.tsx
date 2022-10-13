import { useEffect, useState, useContext } from 'react'
import { useSelector } from 'react-redux';
import Button from "@mui/material/Button";

import { UserContext } from '..';
import { ProfileCard } from '../ProfileCard/index';
// import { ProfileUpdateForm } from '../ProfileUpdateForm/index';
import { IUser } from '../../../../types'
// import { addFriend, removeFriend } from '../../../../services/userServices';
import styles from './styles.module.css';

export function ProfileInfoContainer () {
  const currentUser = useSelector((state: any) => state.currentUser);
  const otherProfile = useContext(UserContext).user;
  const initialFriend = currentUser.friends.filter((friend :IUser)  => friend.uid === otherProfile.uid).length >0
  const [update, setUpdate] = useState(false)
  const [isFriend, setFriend] = useState(initialFriend)

  // useEffect(() => {
  // },[update])

  // const isUserProfile = currentUser.uid == otherProfile.uid

  // const updateProfile = () => {
  //   setUpdate(!update);
  // }

  // const addFriendToUser = async () => {
  //   await addFriend(currentUser.uid, otherProfile.uid);
  //   setFriend(true)
  // }

  // const removeUserFriend = async () => {
  //   await removeFriend(currentUser.uid, otherProfile.uid);
  //   setFriend(false)
  // }

  return (
    <div className={styles.profile_info_container}>
      <ProfileCard />
      {/* <div id = {styles.button_container}>
        {isUserProfile && <Button id ={styles.update_profile} onClick={updateProfile}>Change Avatar</Button>}
        {!isUserProfile &&  !isFriend  &&  <Button id ={styles.add_friend} onClick ={addFriendToUser}>Add Friend</Button>}
        {!isUserProfile &&  isFriend  &&  <Button id ={styles.add_friend} onClick = {removeUserFriend}>Remove Friend</Button>}
      </div>
      {update && <ProfileUpdateForm updateProfile = {updateProfile}/>} */}
    </div>
  )
}