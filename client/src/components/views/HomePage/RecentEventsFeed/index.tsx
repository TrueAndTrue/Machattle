import { useState, useEffect } from "react";
import { IChallenge } from "../../../../types";
import { RecentEventsCard } from "../RecentEventsCard/index";
import { getRecentChallenges } from "../../../../services/challengeServices";
import styles from "./styles.module.css";

export function RecentEventsFeed() {
  const [recentEvents, setRecentEvents] = useState<IChallenge[]>();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const challenges = await getRecentChallenges();
    setRecentEvents(challenges)
  }

  return (
    <div className={styles.recent_events_feed_container}>
      {recentEvents?.map((singleEvent) => (
        <RecentEventsCard data={singleEvent} />
      ))}
    </div>
  );
}
