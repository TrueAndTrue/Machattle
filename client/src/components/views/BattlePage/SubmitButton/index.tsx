import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

//code transpilation!?
import { transform } from '@babel/standalone';
import { updateSubmittedAnswer } from '../../../../state/actions/question';

export function SubmitButton () {
  const dispatch = useDispatch();
  const codeSubmission = useSelector((state: any) => state.currentQuestion.currentAnswer);
  const codeTranspilation = useSelector((state: any) => state.currentQuestion.submittedAnswer);

  function codeTranspile(code: string) {
    console.log(code, 'code?');
    const options = { presets: ['es2015-loose', 'react'] };
    const { code: transpiledCode } = transform(code, options);
    console.log(transpiledCode, 'transpiled');
    if (transpiledCode) {
      dispatch(updateSubmittedAnswer(transpiledCode));
    }
    return transpiledCode;
  }

  return (
    <div className={styles.submit_button_container} >
      <Button onClick={() => codeTranspile(codeSubmission)}>SUBMIT SOLUTION</Button>
      <p>
        <script>{codeTranspilation}</script>
      </p>
    </div>
  )
}