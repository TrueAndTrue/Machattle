import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import moment from "moment";

import { getMailById, deleteMessage } from "../../../../services/mailService";
import { IMessage } from "../../../../types";
import { OptionsBar } from "../OptionsBar";
import { MessageForm } from "../MessageForm";

import styles from "./styles.module.css";

const initialMessage: IMessage = {
  id: -1,
  title: "",
  content: "",
  senderUsername: "",
  receiverUsername: "",
  createdAt: new Date(),
  read: false,
};

export const MessageBody = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mail, setMail] = useState<IMessage>(initialMessage);
  const [isWritting, setWritting] = useState(false);

  const { title, content, senderUsername, createdAt } = mail;

  useEffect(() => {
    getMail();
  }, []);

  const getMail = async () => {
    if (id) {
      const message = await getMailById(parseInt(id));
      setMail(message);
    }
  };

  const timeAgo = moment(createdAt).fromNow();

  const reply = () => {
    setWritting(!isWritting);
  };

  const removeMessage = async () => {
    if (id) await deleteMessage(parseInt(id));
    navigate(-1);
  };

  return (
    <div id={styles.message_body_container}>
      <OptionsBar />
      <div id={styles.message_content}>
        <div id={styles.first_header}>
          <h2>{title}</h2>
          <h4>
            <button id={styles.delete} onClick={removeMessage}>
              delete
            </button>
          </h4>
        </div>
        <div id={styles.second_header}>
          <h4> from {senderUsername}</h4>
          <h4>sent {timeAgo}</h4>
        </div>
        <div id={styles.content}>{content}</div>
        {(isWritting && (
          <div id={styles.form}>
            <MessageForm reply={reply} />{" "}
          </div>
        )) || (
          <Button id={styles.reply} onClick={reply}>
            Reply
          </Button>
        )}
      </div>
    </div>
  );
};
