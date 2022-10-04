import { AvatarContainer } from './AvatarContainer/index';
import { ProfileInfoContainer } from './ProfileInfoContainer';

declare module './styles.module.css';

export function ProfilePage () {

  return (
    <div className="profile-page-container">
      <AvatarContainer />
      <ProfileInfoContainer />
    </div>
  )
}