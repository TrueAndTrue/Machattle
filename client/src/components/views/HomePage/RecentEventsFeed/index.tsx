import { RecentEventsCard } from '../RecentEventsCard/index';
import styles from './styles.module.css';

export function RecentEventsFeed () {

  return (
    <div className={styles.recent_events_feed_container}>
      <RecentEventsCard />
    </div>
  )
}