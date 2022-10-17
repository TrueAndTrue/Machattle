import moment from 'moment'

import { IChallenge } from '../../../../types';
import styles from './styles.module.css';

interface IProps {
  match : IChallenge 
}

export const MatchCard = ({match} :IProps) =>{
  const timeAgo = moment(match.updatedAt).fromNow()
  return (
    <div className={styles.match_card_container}>
      <p className={styles.winner_text}>{match.winnerUsername}</p>
      <p className={styles.event_text}>has defeated</p>
      <p className={styles.loser_text}>{match.loserUsername}</p>
      <p className={styles.timer_text}>{timeAgo}</p>
    </div>
  )
}