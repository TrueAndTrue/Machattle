import { ProfileCard } from '../ProfileCard/index';
import { ProfileUpdateForm } from '../ProfileUpdateForm/index';
import styles from './styles.module.css';

export function ProfileInfoContainer () {

  return (
    <div className={styles.profile_info_container}>
      <ProfileCard />
      {/* on button press, open profile update form */}
      {/* <ProfileUpdateForm /> */}
    </div>
  )
}