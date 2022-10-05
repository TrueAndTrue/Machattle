import { AvatarContainer } from './AvatarContainer/index';
import { ProfileInfoContainer } from './ProfileInfoContainer';
import styles from './styles.module.css';

export function ProfilePage () {

  return (
    <div className={styles.profile_page_container}>
      <AvatarContainer />
      <ProfileInfoContainer />
    </div>
  )
}