import { MatchButton } from "../MatchButton/index";
import styles from "./styles.module.css";
import robo1 from "../../../../assets/CodeBot006.gif";
import robo2 from "../../../../assets/CodeBot005.gif";

interface IProps {
  mode: string;
}

export const MatchCard = ({ mode }: IProps) => {
  let matchObj = {
    title: "",
    buttonText: "",
    source: "",
    body: "",
  };

  if (mode === "ranked") {
    matchObj.title = "RANKED BATTLE";
    matchObj.buttonText = "Find Match";
    matchObj.source = robo1;
    matchObj.body =
      "Complete a challenge head-to-head with another opponent to improve your ranking!";
  } else {
    matchObj.title = "PRACTICE BATTLE";
    matchObj.buttonText = "Enter Match";
    matchObj.source = robo2;
    matchObj.body =
      "Complete a coding challenge alone. Practice your skills, without changing ranking!";
  }

  return (
    <div className={styles.match_card_container}>
      <div className={styles.title_card}>
        <p>{matchObj.title}</p>
      </div>
      <p className={styles.body_text}>{matchObj.body}</p>
      <MatchButton data={matchObj.buttonText} mode={mode} />
      <img src={matchObj.source} alt="robot logo" className={styles.robot_mascot} />
    </div>
  );
};
