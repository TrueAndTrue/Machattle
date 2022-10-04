import { ProfileCard } from '../ProfileCard/index';
import { ProfileUpdateForm } from '../ProfileUpdateForm/index';
declare module './styles.module.css';

export function ProfileInfoContainer () {

  return (
    <div className="profile-info-container">
      <ProfileCard />
      {/* on button press, open profile update form */}
      <ProfileUpdateForm />
    </div>
  )
}