

import { getUserByUsername } from '../../../../services/userServices';
import { IUser } from '../../../../types'

import styles from './styles.module.css';

export function FriendsList () {

  return (
    <div className={styles.friends_list_container}>
      <h1>Friends</h1>
      <div className={styles.friend_carousel}>

      </div>
    </div>
  )
}