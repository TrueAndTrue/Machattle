import { RecentEventsCard } from '../RecentEventsCard/index';
import styles from './styles.module.css';

//devMocks
import { mockEvents } from '../homeMocks';

export function RecentEventsFeed () {

  return (
    <div className={styles.recent_events_feed_container}>
      {mockEvents.map(singleEvent => <RecentEventsCard data={singleEvent} />)}
    </div>
  )
}