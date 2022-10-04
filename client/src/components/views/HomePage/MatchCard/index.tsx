import { MatchButton } from '../MatchButton/index';
declare module './styles.module.css';

export function MatchCard () {

  return (
    <div className="match-card-container">
      <MatchButton />
    </div>
  )
}