import { InstructionsCard } from '../InstructionsCard/index';
import { SubmitButton } from '../SubmitButton/index';
import { Timer } from '../Timer/index';
declare module './styles.module.css';

export function InstructionsContainer () {

  return (
    <div className="instructions-container">
      <InstructionsCard />
      <Timer />
      <SubmitButton />
    </div>
  )
}