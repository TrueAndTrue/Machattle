import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IChallenge } from "../../../../types";
import { getUserChallenges } from "../../../../services/userServices";
import styles from "./styles.module.css";

export function MatchHistory() {
  const { username } = useParams();
  const [challenges, setChallenges] = useState<IChallenge[]>([]);

  useEffect(() => {
    getChallenges();
  }, []);

  const getChallenges = async () => {
    const userChallenges = await getUserChallenges(username!);
    setChallenges(userChallenges);
  };

  return (
    <div className={styles.match_history_container}>
      <h1 className={styles.match_title}>Match History</h1>
      <div className={styles.match_carousel}>
        {/* {challenges.length > 0 && challenges.map(challenge => <MatchCard match={challenge}/>)} */}
      </div>
    </div>
  );
}
