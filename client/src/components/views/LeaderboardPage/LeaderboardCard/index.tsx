import { Link } from 'react-router-dom';
import { ILeaderBoardUser } from '../../../../types';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

interface IProps {
  user : ILeaderBoardUser
  position : number
}


export function LeaderboardCard ({user, position} :IProps) {

  const imgLocations: string[] = [];
  for(let i =1; i<=6;i++){
    imgLocations.push(`ranks/${i}.png`)
  }

  const [rankImg, setRankImg] = useState('');

  useEffect(() => {
    if (user) {
      const rankStr = user.rank[0].split(' ')[0];
      
      if (rankStr === 'Bronze') {
        setRankImg(imgLocations[0])
      }
      else if (rankStr === 'Silver') {
        setRankImg(imgLocations[1])
      }
      else if (rankStr === 'Gold') {
        setRankImg(imgLocations[2])
      }
      else if (rankStr === 'Platinum') {
        setRankImg(imgLocations[3])
      }
      else if (rankStr === 'Diamond') {
        setRankImg(imgLocations[4])
      }
      else if (rankStr === 'Pallidium') {
        setRankImg(imgLocations[5])
      }
    }

  }, [user])


  console.log(user);
  return (
    <div className={styles.leaderboard_card_container}>
      <div id={styles.user_card} >
        <p className={styles.card_text}>{position}</p>
        <Link to={`/profile/${user.username}`} className={styles.card_text}><p>{user.username}</p></Link>
        <div  id={styles.pfp} style={{ backgroundImage: `url(${user.image})` }} />
        <div className={styles.rank}> {user.rank[0]} {user.rank[1]}MP</div>
        <img className={styles.rank_img} src={rankImg} />
      </div>
    </div>
  )
}