import { MatchCard } from '../MatchCard/index';
declare module './styles.module.css';

export function SelectMatchContainer () {

  return (
    <div className="select-match-container">
      <MatchCard />
      <MatchCard />
    </div>
  )
}