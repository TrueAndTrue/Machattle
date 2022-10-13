import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';

import { UserContext } from '..';
import silver from '../../../../assets/Silver.png'
import styles from './styles.module.css';

export function ProfileCard () {
  const user = useContext(UserContext).user;

  console.log(user.image)
  return (
    <div className={styles.profile_card_container}>
      <div className={styles.profile_info}>
        <div className={styles.profile_username}>
          <h2>{(user.username) || 'Username'}</h2>
        </div>
        <div id={styles.profile_img} style={{ backgroundImage: `url(${user.image})` }} />
        <div className={styles.profile_rank}>
          <h2>Your Rank:</h2>
          <h1>{(user.rank) || 'Unranked'}</h1>
          <img className={styles.ranked_logo} src={silver} alt="silver rank icon" />
        </div>
      </div>
      <h2 className={styles.friend_text}>Friends online: {user.friends?.length}</h2>
    </div>
  )
}