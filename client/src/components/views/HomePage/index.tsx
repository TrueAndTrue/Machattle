import { RecentEventsFeed } from "./RecentEventsFeed/index";
import { SelectMatchContainer } from "./SelectMatchContainer/index";
import styles from "./styles.module.css";

export function HomePage() {
  return (
    <div className={styles.home_page_container}>
      <SelectMatchContainer />
      <RecentEventsFeed />
    </div>
  );
}
