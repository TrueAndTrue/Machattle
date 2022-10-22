import { FriendCard } from "../FriendCard";
import { useContext } from "react";
import { UserContext } from "..";
import styles from "./styles.module.css";

export function FriendsList() {
  const friends = useContext(UserContext).user.friends;

  return (
    <div className={styles.friends_list_container}>
      <h1 className={styles.friends_title}>Friends</h1>
      <div className={styles.friends_carousel}>
        {friends?.map((friend) => (
          <FriendCard friend={friend} />
        ))}
      </div>
    </div>
  );
}
