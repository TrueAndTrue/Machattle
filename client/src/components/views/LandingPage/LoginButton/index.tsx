import styles from "./styles.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { btnTheme } from "../../../../themeProvider";

export function LoginButton() {
  const { loginWithPopup } = useAuth0();

  return (
    <ThemeProvider theme={btnTheme}>
      <div className={styles.login_button_container}>
        <Button
          className={styles.login_button}
          onClick={() => loginWithPopup()}
        >
          {" "}
          Login{" "}
        </Button>
      </div>
    </ThemeProvider>
  );
}
