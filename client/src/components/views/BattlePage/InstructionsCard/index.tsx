import { useState } from 'react'
import { useSelector } from 'react-redux';

import { IQuestion } from '../../../../types';

import styles from './styles.module.css';

export function InstructionsCard () {

  const instructions = useSelector((state : any) => state.currentQuestion);
  console.log(instructions)

  return (
    <div className={styles.instructions_card_container}>
      {instructions.question}
    </div>
  )
}