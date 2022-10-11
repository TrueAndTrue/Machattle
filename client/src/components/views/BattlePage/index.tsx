import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateQuestion } from '../../../state/actions/question';
import { getRandomExercise } from '../../../services/exerciseServices';
import { IQuestion } from '../../../types'
import { CodingArena } from './CodingArena/index';
import { InstructionsContainer } from './InstructionsContainer/index';
import styles from './styles.module.css';


const initialQuestion : IQuestion = {id : -1, question :'', difficulty:'', timeComplexity:'', tests:[], timeElapsed :''}

export function BattlePage () {
  const dispatch = useDispatch();

  useEffect(() => {
    getQuestion();
  },[])

  async function getQuestion() {
    const newQuestion = await getRandomExercise(2);
    dispatch(updateQuestion(newQuestion));
  }

  return (
    <div className={styles.battle_page_container}>
      <InstructionsContainer  />
      <CodingArena />
    </div>
  )
}