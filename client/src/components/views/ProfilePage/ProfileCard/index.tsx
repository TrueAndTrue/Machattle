import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import silver from '../../../../assets/Silver.png'


export function ProfileCard () {

  const user = useSelector((state: any) => state.currentUser);
  const [userPfp, setUserPfp] = useState('');

  useEffect(() => {
    setUserPfp(user.image);
  }, [user])

  return (
    <div className={styles.profile_card_container}>
      <div className={styles.profile_info}>
        <div className={styles.profile_username}>
          <h2>{(user && user.username) || 'Username'}</h2>
        </div>
        <div className={styles.profile_img}>
          <img src={userPfp} alt='profile pic' />
        </div>
        <div className={styles.profile_rank}>
          <h2>Your Rank:</h2>
          <h1>{(user && user.rank) || 'Unranked'}</h1>
          <img className={styles.ranked_logo} src={silver} alt="silver rank icon" />
        </div>
      </div>
      <h2 className={styles.friend_text}>Friends online: {user && user.friends.length}</h2>
    </div>
  )
}