import { DropdownMenu } from "./DropdownMenu/index";
import { LogoutButton } from "./LogoutButton/index";
import { Mascot } from "./Mascot/index";
import styles from "./styles.module.css";

export default function NavBar() {

  return (
    <div className={styles.navbar_container}>
      <DropdownMenu />
      <Mascot />
      <LogoutButton />
    </div>
  );
}
