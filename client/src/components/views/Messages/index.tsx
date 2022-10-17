import { useSelector } from "react-redux";
import { useState, useEffect, createContext } from 'react'

import { IMessage } from '../../../types'
import { getAllUserMail } from '../../../services/mailService'
import { MailBox } from "./Mailbox";
import { OptionsBar } from './OptionsBar'
import { MessageForm } from "./MessageForm";

import styles from './styles.module.css';

type IContext = {
  isWritting: boolean,
  setWritting: React.Dispatch<React.SetStateAction<boolean>>
}

const initalState = {
 isWritting :false,
 setWritting: () => {}
}

export const WrittingContext = createContext<IContext>(initalState)

export const Messages = () => {
  const { username } = useSelector((state: any) => state.currentUser);
  const [sentMail, setSentMail] = useState<IMessage[]>([]);
  const [receivedMail, setRecievedMail] = useState<IMessage[]>([]);
  const [isWritting, setWritting] = useState(false)
  
  useEffect(()=> {
    getMail()
  },[])

  const getMail = async () => {
    const messages = await getAllUserMail(username);
    if (messages) {
      const {sentMessages, recievedMessages} = messages;
      setSentMail(sentMessages);
      setRecievedMail(recievedMessages);
    }
  }

  return (
    <div id = {styles.message_view_container}>
       <WrittingContext.Provider value ={{isWritting, setWritting }}>
      <OptionsBar />
      <MailBox mail ={receivedMail} />
      {isWritting && <div id = {styles.form}> <MessageForm/> </div>} 
      </WrittingContext.Provider>
    </div>
  )
}