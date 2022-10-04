import { AvatarSelectForm } from '../AvatarSelectForm/index';
declare module './styles.module.css';

export function AvatarContainer () {

  return (
    <div className="avatar-container">
      <p>Avatar Container Filler Text</p>
      {/* on button press, render select form */}
      <AvatarSelectForm />
    </div>
  )
}