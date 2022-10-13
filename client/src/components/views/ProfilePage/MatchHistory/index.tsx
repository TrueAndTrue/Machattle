import { useContext } from 'react';

import { UserContext } from '..';
import styles from './styles.module.css';

export function MatchHistory () {

  const challenges = useContext(UserContext).user.challenges;

  return (
    <div className={styles.match_history_container}>
      <h1>Match History</h1>

    </div>
  )
}