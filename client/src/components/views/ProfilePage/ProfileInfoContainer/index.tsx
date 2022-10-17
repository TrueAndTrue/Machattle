import { ProfileCard } from '../ProfileCard/index';
import styles from './styles.module.css';

export function ProfileInfoContainer () {

  return (
    <div className={styles.profile_info_container}>
      <ProfileCard />
    </div>
  )
}