import { InstructionsCard } from "../InstructionsCard/index";
import { SubmitButton } from "../SubmitButton/index";

import styles from "./styles.module.css";

interface IProps {
  setTrigger: Function;
  isPractice: boolean;
}

export function InstructionsContainer(props: IProps) {
  return (
    <div className={styles.instructions_container}>
      <InstructionsCard />
      <SubmitButton
        setTrigger={props.setTrigger}
        isPractice={props.isPractice}
      />
    </div>
  );
}
