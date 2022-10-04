import { LeaderboardFeed } from './LeaderboardFeed';
import styles from './styles.module.css';

export function LeaderboardPage () {

  return (
    <div className={styles.leaderboard_page_container}>
      <LeaderboardFeed />
    </div>
  )
}