import { Link } from 'react-router-dom';
import { ILeaderBoardUser } from '../../../../types';
import styles from './styles.module.css';

interface IProps {
  user : ILeaderBoardUser
  position : number
}

export function LeaderboardCard ({user, position} :IProps) {
  return (
    <div className={styles.leaderboard_card_container}>
      <div id = {styles.user_card} >
        <p>{position}</p>
        <Link to={`/profile/${user.username}`}><p>{user.username}</p></Link>
        <div  id ={styles.pfp} style={{ backgroundImage: `url(${user.image})` }} />
      </div>
    </div>
  )
}