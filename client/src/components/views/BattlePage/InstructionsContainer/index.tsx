import { InstructionsCard } from "../InstructionsCard/index";
import { SubmitButton } from "../SubmitButton/index";

import styles from "./styles.module.css";

interface IProps {
  setTrigger: Function
}


export function InstructionsContainer(props: IProps) {
  return (
    <div className={styles.instructions_container}>
      <InstructionsCard />
      <SubmitButton setTrigger={props.setTrigger}/>
    </div>
  );
}
