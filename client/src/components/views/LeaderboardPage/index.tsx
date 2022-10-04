import { LeaderboardFeed } from './LeaderboardFeed';
declare module './styles.module.css';

export function LeaderboardPage () {

  return (
    <div className="leaderboard-page-container">
      <LeaderboardFeed />
    </div>
  )
}