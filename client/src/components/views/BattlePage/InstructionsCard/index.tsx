import { useState } from 'react'
import { useSelector } from 'react-redux';

import { IQuestion } from '../../../../types';

import styles from './styles.module.css';

export function InstructionsCard () {

  const instructions = useSelector((state : any) => state.currentQuestion);

  return (
    <div className={styles.instructions_card_container}>
      <p className={styles.instructions_text}>
        {instructions.question}
      </p>
    </div>
  )
}