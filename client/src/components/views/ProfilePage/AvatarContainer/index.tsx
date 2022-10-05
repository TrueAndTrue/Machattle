import { AvatarSelectForm } from '../AvatarSelectForm/index';
import styles from './styles.module.css';

export function AvatarContainer () {

  return (
    <div className={styles.avatar_container}>
      <p>Avatar Container Filler Text</p>
      {/* on button press, render select form */}
      <AvatarSelectForm />
    </div>
  )
}