import { CodingArena } from './CodingArena/index';
import { InstructionsContainer } from './InstructionsContainer/index';
declare module './styles.module.css';

export function BattlePage () {

  return (
    <div className="battle-page-container">
      <InstructionsContainer />
      <CodingArena />
    </div>
  )
}