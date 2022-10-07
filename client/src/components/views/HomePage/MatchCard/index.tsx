import { FunctionComponent } from 'react'
import { MatchButton } from '../MatchButton/index';
import styles from './styles.module.css';
import robo from '../../../../assets/CodeBot004.gif';

interface IProps {
  mode: string,
}

export const MatchCard: FunctionComponent<IProps> = (mode) => {

  let matchObj = {
    title: '',
    buttonText: '',
    body: '',
  };

  if (mode.mode === 'ranked') {
    matchObj.title = 'RANKED BATTLE';
    matchObj.buttonText = 'Find Match';
    matchObj.body = 'Complete a challenge head-to-head with another opponent to improve your ranking!';
  } else {
    matchObj.title = 'PRACTICE BATTLE';
    matchObj.buttonText = 'Enter Match';
    matchObj.body = 'Complete a coding challenge alone. Practice your skills, without changing ranking!';
  };


  return (
    <div className={styles.match_card_container}>
      <div className={styles.title_card}>
        <p>{matchObj.title}</p>
      </div>
      <p className={styles.body_text}>{matchObj.body}</p>
      <MatchButton data={matchObj.buttonText} />
      <img src={robo} alt='robot logo' className={styles.robot_mascot}/>
    </div>
  )
}