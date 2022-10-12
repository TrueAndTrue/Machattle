import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export function ProfileUpdateForm () {
  const user = useSelector((state: any) => state.currentUser);
  const [userPfp, setUserPfp] = useState('');

  useEffect(() => {
    setUserPfp(user.image);
  }, [user])


  return (
    <div className={styles.profile_update_form_container}>
      
    </div>
  )
}