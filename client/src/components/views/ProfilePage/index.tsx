import { RecentEventsFeed } from '../HomePage/RecentEventsFeed';
import { AvatarContainer } from './AvatarContainer/index';
import { FriendsList } from './FriendsList';
import { MatchHistory } from './MatchHistory';
import { ProfileInfoContainer } from './ProfileInfoContainer';
import styles from './styles.module.css';

export function ProfilePage () {


  return (
    <div className={styles.profile_page_container}>
      <div className={styles.profile_left}>
        <ProfileInfoContainer/>
        <FriendsList />
      </div>
      <RecentEventsFeed />
    </div>
  )
}