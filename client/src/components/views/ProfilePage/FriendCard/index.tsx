import { Link, Route } from 'react-router-dom'
import { ProfilePage } from '..'
import { IUser } from "../../../../types"

import styles from './styles.module.css';

interface IProps {
  friend :IUser
}

export const FriendCard = ({friend} :IProps) => {

  return (
    <div id = {styles.friend_card}>
      <Link to ={`../../profile/${friend.username}`} relative="path" id = {styles.friend_link}>
        <h4>{friend.username}</h4>
      </Link>
      <image  id ={styles.pfp} style={{ backgroundImage: `url(/pfp/${friend.image})` }} />
    </div>
  )
}