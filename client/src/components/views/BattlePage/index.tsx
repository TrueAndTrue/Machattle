import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "./Popup/index";

import { updateCurrentAnswer } from "../../../state/actions/question";
import { updateQuestion } from '../../../state/actions/question';
import { getRandomExercise } from '../../../services/exerciseServices';
import { IQuestion } from '../../../types'
import { CodingArena } from './CodingArena/index';
import { InstructionsContainer } from './InstructionsContainer/index';
import styles from './styles.module.css';
import { getUserById } from '../../../services/userServices';
import { ShootingStar } from '../QueuePage/ShootingStar';

const initialQuestion: IQuestion = {
  id: -1,
  question: "",
  difficulty: "",
  timeComplexity: "",
  tests: [],
  timeElapsed: "",
  functionName :"",
  parameters: []
};

export function BattlePage() {
  const dispatch = useDispatch();
  const { player1, player2, roomId } = useSelector((state: any) => state.match);
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
  },[]);

  async function getQuestion() {
    let salt :number;
    console.log(roomId)
    roomId ? salt = parseInt(roomId) : salt = Math.floor((Math.random()*10000))
    const newQuestion = await getRandomExercise(2,salt);
    console.log(newQuestion)
    dispatch(updateQuestion(newQuestion));
    let initialCode = `function ${newQuestion.functionName}(${newQuestion.parameters[0]}) {\n\n}`
    dispatch(updateCurrentAnswer(initialCode))
  }

  useEffect(() => {
    console.log('trig!')
  }, [trigger])

  return (
    <div className={styles.battle_page_container}>
      {trigger && <Popup isRanked={true} enemyUser=""/>}
      <ShootingStar />
      <div className={styles.battle_title}>
        {roomId && <div><p>{thisUsername} (me) VS {opponentUsername} </p></div>}
      </div>
      <div className={styles.battle_page}>
        <InstructionsContainer setTrigger={setTrigger}/>
        <CodingArena />
      </div>
    </div>
  );
}