import styles from './styles.module.css';
import robo from '../../../assets/CodeBot004.gif'

export function Mascot () {

  return (
    <div className={styles.mascot_container}>
      <img src={robo} alt='robot logo' className={styles.robot_mascot}/>
      <h1 className={styles.app_title}>MACHATTLE</h1>
    </div>
  )
}