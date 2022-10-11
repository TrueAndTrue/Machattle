import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useContext } from 'react';
import SocketContext from '../../../../contexts/Context';

//code transpilation!?
import { updateSubmittedAnswer } from '../../../../state/actions/question';
import { useEffect, useState } from 'react';

let testsFailed = 0;
let testsPassed = 0;
let failError = '';

export function SubmitButton () {
  const dispatch = useDispatch();
  const codeSubmission = useSelector((state: any) => state.currentQuestion.currentAnswer);
  const testArray = useSelector((state: any) => state.currentQuestion.tests);
  const thisUser = useSelector((state: any) => state.currentUser.uid);
  const [ getUpdate, setUpdate ] = useState('');
  const { roomId, player1, player2 } = useSelector((state: any) => state.match);
  const { socket } = useContext(SocketContext).SocketState
  const [winnerText, setWinnerText] = useState('')
  socket?.connect();

  useEffect (() => {
  }, [getUpdate])

  function codeSubmit(code: string) {
    const parseFunction = (str: string) => {
      return Function('"use strict";return (' + str + ')')();
    }
    let testFunction = parseFunction(code);
    testsFailed = 0;
    testsPassed = 0;

    testArray.forEach((tuple: any) => {
      let args = tuple[0];
      if (Array.isArray(args)) {
        if(testFunction(...args) == tuple[1]) {
          testsPassed = testsPassed + 1;
        } else {
          failError = `Expected result of ${args} to be ${tuple[1]}.`
          testsFailed = testsFailed + 1;
        }
      } else {
        if (testFunction(args) == tuple[1]) {
          testsPassed = testsPassed + 1;
        } else {
          failError = `Expected result of ${args} to be ${tuple[1]}.`
          testsFailed = testsFailed + 1;
        }
      };
    })

    if (testsPassed === testArray.length) {
      socket?.emit('player_won', thisUser, roomId);
    }

    setUpdate(getUpdate + 'rerender');
  }

  socket?.on('winner', (winner) => {
    if (thisUser === winner) {
      setWinnerText('YOU WON!')
    }
    else {
      setWinnerText('You lost ;(')
    }
  })

  return (
    <div className={styles.submit_button_container} >
      <Button onClick={() => codeSubmit(codeSubmission)}>SUBMIT SOLUTION</Button>
      <div className={styles.tests_result_container} >
        <p>{testArray.length} total tests</p>
        { testsPassed === testArray.length ?
          <p>All tests passed!</p>
        : <p>{failError}</p>
        }
      </div>
      {winnerText}
    </div>
  )
}

const mocksAdd = [[[3,5], 8], [[2,3], 5]]