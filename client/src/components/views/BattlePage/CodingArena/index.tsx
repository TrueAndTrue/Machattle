import { useState } from 'react';
import styles from './styles.module.css';

//code mirror modules
import CodeMirror from "@uiw/react-codemirror";
import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import {defaultKeymap } from "@codemirror/commands"
import { javascript } from '@codemirror/lang-javascript';

//state imports
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentAnswer } from '../../../../state/actions/question';

let language = new Compartment, tabSize = new Compartment

export function CodingArena () {
  const dispatch = useDispatch();
  const [ getCode, setCode ] = useState('');

  return (
    <div className={styles.coding_arena_container}>
      <CodeMirror
        value={useSelector((state: any) => state.currentQuestion.currentAnswer)}
        extensions={[
          basicSetup,
          language.of(javascript()),
          keymap.of(defaultKeymap),
          tabSize.of(EditorState.tabSize.of(2)),
          arenaTheme,
        ]}
        onChange={(value: string) => {
          console.log(value, 'in onChange');
          dispatch(updateCurrentAnswer(value));
          // setCode(value)
        }}
      />
    </div>
  )
}

//styling for the code mirror field
const arenaTheme = EditorView.theme({
  "&": {
    height: "66vh",
    width: "60vw",
    color: "#393e46",
    backgroundColor: "#eeeeee",
    borderRadius: "5px",
  },
  ".cm-content": {
    caretColor: "#393e46"
  },
  ".cm-scroller": {overflow: "auto"},
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#393e46"
  },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#393e46",
    color: "#eeeeee",
  },
  ".cm-gutters": {
    backgroundColor: "#4ecca3",
    color: "#eeeeee",
    borderRadius: "5px",
    border: "none"
  }
}, {dark: true})