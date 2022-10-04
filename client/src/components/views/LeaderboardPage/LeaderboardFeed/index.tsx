import { LeaderboardCard } from '../LeaderboardCard';

declare module './styles.module.css';

export function LeaderboardFeed () {

  return (
    <div className="leaderboard-feed-container">
      <LeaderboardCard />
    </div>
  )
}