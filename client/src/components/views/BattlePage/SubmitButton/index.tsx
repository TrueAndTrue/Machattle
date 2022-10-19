import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import SocketContext from "../../../../contexts/Context";
import { createChallenge } from "../../../../services/challengeServices";
import { useEffect, useState } from "react";
import { updateMatch } from "../../../../state/actions/match";
import { updateRank } from "../../../../services/userServices";

let testsFailed = 0;
let testsPassed = 0;
let failError: [string] = [""];

interface IProps {
  setTrigger: Function;
  isPractice: boolean;
}

export function SubmitButton(props: IProps) {
  const codeSubmission = useSelector(
    (state: any) => state.currentQuestion.currentAnswer
  );
  const testArray =
    useSelector((state: any) => state.currentQuestion.tests) || [];
  const thisUser = useSelector((state: any) => state.currentUser.uid) || "";
  const questionId = useSelector((state: any) => state.currentQuestion.id);
  const [getUpdate, setUpdate] = useState("");

  const { roomId, player1, player2 } = useSelector((state: any) => state.match);
  const { socket } = useContext(SocketContext).SocketState;
  const dispatch = useDispatch();
  socket?.connect();

  useEffect(() => {
    socket?.on("winner", (winner) => {
      const enemy = findEnemy(player1, player2);
      if (thisUser === winner) {
        updateRank(thisUser, 20);
        props.setTrigger(true);
        createChallenge(thisUser, enemy, questionId);
        dispatch(
          updateMatch({
            player1: player1,
            player2: player2,
            matchFound: true,
            winner: thisUser,
            loser: enemy,
            roomId: roomId,
          })
        );
      } else {
        updateRank(thisUser, -20);
        props.setTrigger(true);
        dispatch(
          updateMatch({
            player1: player1,
            player2: player2,
            matchFound: true,
            winner: enemy,
            loser: thisUser,
            roomId: roomId,
          })
        );
        socket.removeAllListeners("winner");
      }
    });
  }, []);

  function codeSubmit(code: string) {
    const parseFunction = (str: string) => {
      return Function('"use strict";return (' + str + ")")();
    };
    let testFunction = parseFunction(code);
    testsFailed = 0;
    testsPassed = 0;

    testArray.forEach((tuple: any) => {
      let args = tuple[0];
      if (Array.isArray(args)) {
        if (JSON.stringify(testFunction(...args)) == tuple[1]) {
          testsPassed = testsPassed + 1;
        } else {
          failError.push(
            `Expected result of ${args} to be ${tuple[1]}, not ${JSON.stringify(
              testFunction(...args)
            )}.`
          );
          testsFailed = testsFailed + 1;
        }
      } else {
        if (JSON.stringify(testFunction(args)) == tuple[1]) {
          testsPassed = testsPassed + 1;
        } else {
          failError.push(
            `Expected result of ${args} to be ${tuple[1]}, not ${JSON.stringify(
              testFunction(args)
            )}.`
          );
          testsFailed = testsFailed + 1;
        }
      }
    });

    if (testsPassed === testArray.length) {
      socket?.emit("player_won", thisUser, roomId);

      if (props.isPractice) props.setTrigger(true);
    }

    setUpdate(getUpdate + "rerender");
  }

  const findEnemy = (uid1: string, uid2: string) => {
    if (uid1 === thisUser) {
      return uid2;
    } else {
      return uid1;
    }
  };

  return (
    <div className={styles.submit_button_container}>
      <div className={styles.tests_result_container}>
        <p className={styles.tests_text}>{testArray.length} total tests</p>
        {testsPassed === testArray.length ? (
          <p className={styles.tests_text}>All tests passed!</p>
        ) : (
          <p>{failError.join("\n")}</p>
        )}
      </div>
      <button
        className={styles.submit_button}
        onClick={() => codeSubmit(codeSubmission)}
      >
        SUBMIT SOLUTION
      </button>
    </div>
  );
}
