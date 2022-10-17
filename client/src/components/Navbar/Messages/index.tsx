import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'

import { IMessage } from '../../../types'
import { getAllUserMail } from '../../../services/mailService'
import { MailBox } from "./Mailbox";


export const Messages = () => {
  const { id } = useSelector((state: any) => state.currentUser);
  const [sentMail, setSentMail] = useState<IMessage[]>([]);
  const [receivedMail, setRecievedMail] = useState<IMessage[]>([]);

  useEffect(()=> {
    getMail()
  },[])

  const getMail = async () => {
    const messages = await getAllUserMail(id);
    if (messages) {
      const {sentMessages, recievedMessages} = messages;
      setSentMail(sentMessages);
      setRecievedMail(recievedMessages);
    }
  }

  return (
    <div>
      <MailBox mail ={receivedMail} />
    </div>
  )
}