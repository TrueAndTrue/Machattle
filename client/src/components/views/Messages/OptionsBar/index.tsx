import { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";

import { WrittingContext } from "..";

import styles from "./styles.module.css";

export const OptionsBar = () => {
  const { isWritting, setWritting, setViewing } = useContext(WrittingContext);

  const onClick = () => {
    setWritting(!isWritting);
  };

  return (
    <Box
      id={styles.options}
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding key={"send"}>
            <ListItemButton onClick={onClick}>
              <ListItemText primary="New Message" />
            </ListItemButton>
          </ListItem>
          <Link to={"/messages"} className={styles.link_text}>
            <ListItemButton onClick={() => setViewing(false)}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
          </Link>
          <ListItem disablePadding key={"messages"}>
            <Link to={"/messages"} className={styles.link_text}>
              <ListItemButton onClick={() => setViewing(true)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </nav>
      <Divider />
    </Box>
  );
};
