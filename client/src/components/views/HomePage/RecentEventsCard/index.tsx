import { FunctionComponent } from 'react';
import { IChallenge } from '../../../../types';
import moment from 'moment'
import styles from './styles.module.css';

interface IProps {
  data: IChallenge
}


export const RecentEventsCard: FunctionComponent<IProps> = (data) => {
  const feedData = data.data;
  const timeAgo = moment(feedData.updatedAt).fromNow()
  console.log(timeAgo)
  return (
    <div className={styles.recent_events_card_container}>
      <p className={styles.winner_text}>{feedData.winnerUsername}</p>
      <p className={styles.event_text}>has defeated</p>
      <p className={styles.loser_text}>{ feedData.loserUsername }</p>
      <p className={styles.timer_text}>{timeAgo}</p>
    </div>
  )
}