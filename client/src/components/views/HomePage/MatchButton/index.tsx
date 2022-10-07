import { FunctionComponent } from 'react';
import styles from './styles.module.css';
import Button from '@mui/material/Button'

interface IProps {
  data: string,
}

export const MatchButton: FunctionComponent<IProps> = (data) => {

  return (
    <div className={styles.match_button_container}>
      <Button>{data.data}</Button>
    </div>
  )
}