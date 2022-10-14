import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useContext } from 'react';
import Button from "@mui/material/Button";

import { UserContext } from '..';
import { ProfileUpdateForm } from '../ProfileUpdateForm';
import silver from '../../../../assets/Silver.png';
import { IUser } from '../../../../types';
import { addFriend, removeFriend } from '../../../../services/userServices';
import styles from './styles.module.css';

export function ProfileCard () {
  const user = useContext(UserContext).user;

  const currentUser = useSelector((state: any) => state.currentUser);
  const otherProfile = useContext(UserContext).user;
  const initialFriend = currentUser.friends.filter((friend :IUser)  => friend.uid === otherProfile.uid).length >0
  const [update, setUpdate] = useState(false)
  const [isFriend, setFriend] = useState(initialFriend)

  useEffect(() => {
  },[update])

  const isUserProfile = currentUser.uid == otherProfile.uid

  const updateProfile = () => {
    setUpdate(!update);
  }

  const addFriendToUser = async () => {
    await addFriend(currentUser.uid, otherProfile.uid);
    setFriend(true)
  }

  const removeUserFriend = async () => {
    await removeFriend(currentUser.uid, otherProfile.uid);
    setFriend(false)
  }

  console.log(user.image)
  return (
    <div className={styles.profile_card_container}>
      <div className={styles.profile_info}>
        <div className={styles.profile_username}>
          <h2 className={styles.user_text}>{(user.username) || 'Username'}</h2>
          <h2 className={styles.friend_text}>Friends Online: {user.friends?.length}</h2>
        </div>
        <div className={styles.avatar_container}>
          <div id={styles.profile_img} style={{ backgroundImage: `url(${user.image})` }} />
          <div id = {styles.button_container}>
            {isUserProfile && <Button id ={styles.update_profile} onClick={updateProfile}>Change Avatar</Button>}
            {!isUserProfile &&  !isFriend  &&  <Button id ={styles.add_friend} onClick ={addFriendToUser}>Add Friend</Button>}
            {!isUserProfile &&  isFriend  &&  <Button id ={styles.add_friend} onClick = {removeUserFriend}>Remove Friend</Button>}
          </div>
          {update && <ProfileUpdateForm updateProfile = {updateProfile}/>}
        </div>
        <div className={styles.profile_rank}>
          <h2 className={styles.ranked_text}>Your Rank:</h2>
          <h1 className={styles.ranked_text}>{(user.rank[0] + ' ' + user.rank[1] + 'MP') || 'Unranked'}</h1>
          <img className={styles.ranked_logo} src={silver} alt="silver rank icon" />
        </div>
      </div>
    </div>
  )
}