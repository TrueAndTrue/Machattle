import { DropdownMenu } from './DropdownMenu/index';
import { LogoutButton } from './LogoutButton/index';
import { Mascot } from './Mascot/index';
declare module './styles.module.css';

export function NavBar () {

  return (
    <div className="navbar-container">
      <DropdownMenu />
      <Mascot />
      <LogoutButton />
    </div>
  )
}