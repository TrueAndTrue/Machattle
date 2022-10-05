import { MatchButton } from '../MatchButton/index';
import styles from './styles.module.css';

export function MatchCard () {

  return (
    <div className={styles.match_card_container}>
      <MatchButton />
    </div>
  )
}