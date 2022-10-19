import { IChallenge } from "../../../../types";
import { RecentEventsCard } from "../RecentEventsCard/index";
import styles from "./styles.module.css";

interface IProps {
  recentEvents: IChallenge[];
}

export function RecentEventsFeed({ recentEvents }: IProps) {
  return (
    <div className={styles.recent_events_feed_container}>
      {recentEvents?.map((singleEvent) => (
        <RecentEventsCard data={singleEvent} />
      ))}
    </div>
  );
}
