import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../../../state/actions/question";
import { getRandomExercise } from "../../../services/exerciseServices";
import { IQuestion } from "../../../types";
import { CodingArena } from "./CodingArena/index";
import { InstructionsContainer } from "./InstructionsContainer/index";
import styles from "./styles.module.css";
import { getUserById } from "../../../services/userServices";
import { Popup } from "./Popup/index";

const initialQuestion: IQuestion = {
  id: -1,
  question: "",
  difficulty: "",
  timeComplexity: "",
  tests: [],
  timeElapsed: "",
};

export function BattlePage() {
  const dispatch = useDispatch();
  const { player1, player2 } = useSelector((state: any) => state.match);
  const thisUser = useSelector((state: any) => state.currentUser.uid);
  const [thisUsername, setThisUsername] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [opponentUsername, setOpponentUsername] = useState("");

  useEffect(() => {
    getQuestion();
    (async () => {
      const p1 = await getUserById(player1);
      const p2 = await getUserById(player2);
      console.log(p1, p2);
      if (p1.res.uid === thisUser) {
        setThisUsername(p1.res.username);
        setOpponentUsername(p2.res.username);
      } else {
        setThisUsername(p2.res.username);
        setOpponentUsername(p1.res.username);
      }
    })();
  }, []);

  async function getQuestion() {
    const newQuestion = await getRandomExercise(2);
    dispatch(updateQuestion(newQuestion));
  }

  useEffect(() => {
    console.log('trig!')
  }, [trigger])

  return (
    <div className={styles.battle_page_container}>
      {trigger && <Popup />}
      <div className={styles.battle_title}>
        <p>{thisUsername} (me)</p> <p> VS </p> <p> {opponentUsername} </p>
      </div>
      <div className={styles.battle_page}>
        <InstructionsContainer setTrigger={setTrigger}/>
        <CodingArena />
      </div>
    </div>
  );
}
