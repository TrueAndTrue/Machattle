import { CodingArena } from './CodingArena/index';
import { InstructionsContainer } from './InstructionsContainer/index';
import styles from './styles.module.css';

export function BattlePage () {

  return (
    <div className={styles.battle_page_container}>
      <InstructionsContainer />
      <CodingArena />
    </div>
  )
}