import { LeaderboardCard } from '../LeaderboardCard';
import styles from './styles.module.css';

export function LeaderboardFeed () {

  return (
    <div className={styles.leaderboard_feed_container}>
      <LeaderboardCard />
    </div>
  )
}