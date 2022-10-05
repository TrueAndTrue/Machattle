import styles from './styles.module.css';
import robo from '../../../assets/CodeBot004.gif'

export function Mascot () {

  return (
    <div className={styles.mascot_container}>
      <img src={robo} alt='robot logo'/>
    </div>
  )
}