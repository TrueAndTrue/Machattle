import { useContext } from 'react';

import { UserContext } from '..';
import { updatePfp } from '../../../../services/userServices';

import styles from './styles.module.css';
import { AvatarSelectForm } from '../AvatarSelectForm';

interface IProps{
  updateProfile :Function
}

export function ProfileUpdateForm ({updateProfile} :IProps) {

  const profileUser = useContext(UserContext).user;

  interface TargetWithSrc extends EventTarget {
    currentSrc :string
  }

  const onClick = (event : React.MouseEvent<HTMLButtonElement>) => {
    const sourceEvent : TargetWithSrc = event.target as TargetWithSrc
    const imgLocation = sourceEvent.currentSrc.split('pfp')
    updatePfp(profileUser.uid,'/pfp/'+imgLocation[1])
    profileUser.image='/pfp/'+imgLocation[1];
    updateProfile();
  }

  return (
    <div className={styles.profile_update_form_container}>
      <AvatarSelectForm onClick={onClick} />
    </div>
  )
}