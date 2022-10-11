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
        <p>{position}</p> <p>{user.username}</p> <div  id ={styles.pfp} style={{ backgroundImage: `url(/pfp/${user.image})` }} />
      </div>
    </div>
  )
}