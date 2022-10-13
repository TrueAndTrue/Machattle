import Button from "@mui/material/Button";
import styles from './styles.module.css';

interface IProps {
  onClick :Function
}

export function AvatarSelectForm ({onClick} :IProps) {
  const imgLocations =[];
  for(let i =1; i<=10;i++){
    imgLocations.push(`pfp/Avatar${i}.png`)
  }

  return (
    <div className={styles.avatar_select_form_container}>
      <h4>Select Profile Image</h4>
      <div>{imgLocations.map(img =>{
        return (
        <Button className ={styles.avatar_button} onClick={e => onClick(e)} value ={img}>
          <img src = {`/${img}`} className={styles.pfp}/>
        </Button>)
     })}
     </div>
    </div>
  )
}