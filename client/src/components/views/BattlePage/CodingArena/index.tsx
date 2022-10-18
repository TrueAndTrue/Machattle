import styles from "./styles.module.css";

//code mirror modules
import CodeMirror from "@uiw/react-codemirror";
import { EditorState, EditorStateConfig, Compartment } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

//state imports
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentAnswer } from "../../../../state/actions/question";

let language = new Compartment(),
  tabSize = new Compartment();

export function CodingArena() {
  const dispatch = useDispatch();
  return (
    <div className={styles.coding_arena_container}>
      <CodeMirror
        value={useSelector((state: any) => state.currentQuestion.currentAnswer)}
        basicSetup={
          {foldGutter: false,}
        }
        extensions={[
          // basicSetup,
          language.of(javascript()),
          keymap.of(defaultKeymap),
          tabSize.of(EditorState.tabSize.of(2)),
          arenaTheme,
        ]}
        theme="dark"
        onChange={(value: string) => {
          dispatch(updateCurrentAnswer(value));
          // setCode(value)
        }}
      />
    </div>
  );
}

//styling for the code mirror field
const arenaTheme = EditorView.theme(
  {
    "&": {
      height: "75vh",
      width: "50vw",
      color: "#eeeeee",
      backgroundColor: "#393e46",
      zIndex: "0",
      borderRadius: "10px",
    },
    ".cm-content": {
      caretColor: "#393e46",
      backgroundColor: "#232931",
      borderRadius: "0 10px 10px 0",
      zIndex: "0",
    },
    ".cm-scroller": { overflow: "auto" },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#393e46",
      borderRadius: "10px",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#393e46",
      color: "#eeeeee",
      borderRadius: "10px",
    },
    ".cm-gutters": {
      backgroundColor: "#4ecca3",
      color: "#eeeeee",
      borderRadius: "10px 0 0 10px",
      border: "none",
    },
  },
  { dark: true }
);
