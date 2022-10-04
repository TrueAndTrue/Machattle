import { RecentEventsCard } from '../RecentEventsCard/index';
declare module './styles.module.css';

export function RecentEventsFeed () {

  return (
    <div className="recent-events-feed-container">
      <RecentEventsCard />
    </div>
  )
}