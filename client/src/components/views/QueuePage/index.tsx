import { LinearProgress } from '@mui/material';
import styles from './styles.module.css';
import robo from '../../../assets/CodeBot004.gif'

export function QueuePage () {

  return (
    <div className={styles.queue_page_container}>
      <div className={styles.queue_page_card}>
        <p className={styles.queue_text}>Searching for match...</p>
        <LinearProgress color="primary" className={styles.loading_bar} />
        <img src={robo} alt='robot logo' className={styles.robot_mascot} />
      </div>
    </div>
  )
}