import { MatchCard } from "../MatchCard/index";
import styles from "./styles.module.css";

export function SelectMatchContainer() {
  return (
    <div className={styles.select_match_container}>
      <MatchCard mode="ranked" />
      <MatchCard mode="unranked" />
    </div>
  );
}
