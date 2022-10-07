import { FunctionComponent } from 'react';
import styles from './styles.module.css';

interface IProps {
  data: {
    challenger1: string,
    challenger2: string,
    winner: string,
    questionDifficulty: string,
    when: string}
}


export const RecentEventsCard: FunctionComponent<IProps> = (data) => {
  const feedData = data.data;

  return (
    <div className={styles.recent_events_card_container}>
      <p className={styles.winner_text}>{feedData.winner}</p>
      <p className={styles.event_text}>has defeated</p>
      <p className={styles.loser_text}>{ feedData.winner === feedData.challenger1 ? feedData.challenger2 : feedData.challenger1 }</p>
      <p className={styles.timer_text}>{feedData.when}</p>
    </div>
  )
}