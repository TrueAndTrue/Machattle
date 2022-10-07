import { InstructionsCard } from '../InstructionsCard/index';
import { SubmitButton } from '../SubmitButton/index';

import styles from './styles.module.css';


export function InstructionsContainer () {

  return (
    <div className={styles.instructions_container}>
      <InstructionsCard />
      <SubmitButton />
    </div>
  )
}