import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

//code transpilation!?
import { updateSubmittedAnswer } from '../../../../state/actions/question';
import { useEffect, useState } from 'react';

let testsFailed = 0;
let testsPassed = 0;
let failError = '';

export function SubmitButton () {
  const dispatch = useDispatch();
  const codeSubmission = useSelector((state: any) => state.currentQuestion.currentAnswer);
  const [ getUpdate, setUpdate ] = useState('');

<<<<<<< HEAD
  useEffect (() => {
  }, [getUpdate])

  function codeSubmit(code: string) {
    const parseFunction = (str: string) => {
      return Function('"use strict";return (' + str + ')')();
    }
    let testFunction = parseFunction(code);
    testsFailed = 0;
    testsPassed = 0;

    mocksAdd.forEach((tuple) => {
      let args = tuple[0];
      if (Array.isArray(args)) {
        if(testFunction(...args) === tuple[1]) {
          testsPassed = testsPassed + 1;
        } else {
          failError = `Expected result of ${args} to be ${tuple[1]}.`
          testsFailed = testsFailed + 1;
        }
      } else {
        if (testFunction(args) === tuple[1]) {
          testsPassed = testsPassed + 1;
        } else {
          failError = `Expected result of ${args} to be ${tuple[1]}.`
          testsFailed = testsFailed + 1;
        }
      };
    })
    setUpdate(getUpdate + 'rerender');
=======
  function codeTranspile(code: string) {
    console.log(code, 'code?');
    const options = { presets: ['es2015-loose', 'react'] };
    const { code: transpiledCode } = transform(code, options);
    console.log(transpiledCode, 'transpiled');
    if (transpiledCode) {
      dispatch(updateSubmittedAnswer(transpiledCode));
    }
    return transpiledCode;
>>>>>>> add-question
  }

  return (
    <div className={styles.submit_button_container} >
      <Button onClick={() => codeSubmit(codeSubmission)}>SUBMIT SOLUTION</Button>
      <div className={styles.tests_result_container} >
        <p>{mocksAdd.length} total tests</p>
        { testsPassed === mocksAdd.length ?
          <p>All tests passed!</p>
        : <p>{failError}</p>
        }
      </div>
    </div>
  )
}

const mocksAdd = [[[3,5], 8], [[2,3], 5]]