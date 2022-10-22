import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTopUsers } from "../../../../services/userServices";
import { updateLeaderBoard } from "../../../../state/actions/leaderBoard";
import { ILeaderBoardUser } from "../../../../types";
import { LeaderboardCard } from "../LeaderboardCard";
import styles from "./styles.module.css";

export function LeaderboardFeed() {
  const [leaders, setLeaders] = useState<ILeaderBoardUser[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getTop10();
  }, []);

  async function getTop10() {
    const topUsers = await getTopUsers();
    dispatch(updateLeaderBoard(topUsers));
    setLeaders([...topUsers]);
  }

  return (
    <div className={styles.leaderboard_feed_container}>
      {leaders.map((leader, index) => (
        <LeaderboardCard user={leader} position={index + 1} />
      ))}
    </div>
  );
}
