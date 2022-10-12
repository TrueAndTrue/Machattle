import styles from "./styles.module.css";

export function WelcomeBanner() {
  return (
    <div className={styles.welcome_banner_container}>
      <h1>Compete in battles to improve your rank!</h1>
      <h1>Will you be stuck in Silver? Or climb to the tops of Master?</h1>
    </div>
  );
}
