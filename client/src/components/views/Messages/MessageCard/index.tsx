import { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { setMessageAsRead } from "../../../../services/mailService";
import { IMessage } from "../../../../types";
import styles from "./styles.module.css";

import { WrittingContext } from "..";

interface IProps {
  message: IMessage;
}

export const MessageCard = ({ message }: IProps) => {
  const { viewing } = useContext(WrittingContext);
  const { senderUsername, title, createdAt, read, receiverUsername } = message;

  const messageId = message.id;
  const timeAgo = moment(createdAt).fromNow();

  let readStyle;
  read ? (readStyle = styles.read) : (readStyle = styles.unread);

  const setRead = () => {
    if (messageId) setMessageAsRead(messageId);
  };

  return (
    <Link className={styles.message_card} to={`${messageId}`} onClick={setRead}>
      <div id={styles.align_indicator}>
        <div className={readStyle} id={styles.read_indicator} />
        {viewing ? (
          <p>Sent By {senderUsername} </p>
        ) : (
          <p>Sent To {receiverUsername}</p>
        )}
      </div>
      <p className={styles.details}> {title} </p>
      <p className={styles.details}> {timeAgo} </p>
    </Link>
  );
};
