import styles from "./styles.module.css";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUser, getUserByUsername } from "../../../services/userServices";
import { updateUser } from "../../../state/actions/user";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function PopUp() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [inputError, setInputError] = useState(false);

  const { user } = useAuth0();

  const navigate = useNavigate();

  const usernameSubmit = async () => {
    let isUnique = true;
    const returnUser = await getUserByUsername(username);
    console.log(returnUser);

    if (returnUser?.status === 200) {
      setInputError(true);
      isUnique = false;
    }

    if (isUnique && user && user.sub && user.picture) {
      setInputError(false);
      const newUser = await addUser(user.sub, username, user.picture);
      dispatch(updateUser(newUser));
      navigate("/home");
    }
  };

  return (
    <div className={styles.pop_up_container}>
      <div className={styles.pop_up}>
        <div>
          <h1>Choose username below</h1>
        </div>
        <form className={styles.pop_up_form}>
          {!inputError && (
            <TextField
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            >
              {" "}
            </TextField>
          )}
          {inputError && (
            <TextField
              error
              label="error"
              helperText="username taken"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            >
              {" "}
            </TextField>
          )}
          <Button className={styles.pop_up_btn} onClick={usernameSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
