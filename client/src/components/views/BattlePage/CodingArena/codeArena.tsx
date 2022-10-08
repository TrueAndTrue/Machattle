import { useState, useCallback, useEffect } from 'react';

import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import {defaultKeymap } from "@codemirror/commands"
import { javascript } from '@codemirror/lang-javascript';

import styles from './styles.module.css';

let language = new Compartment, tabSize = new Compartment

export default function useCodeArena(extensions: any[] | undefined) {
  const [element, setElement] = useState<HTMLElement>();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: 'Hello Codebot',
        extensions: [
          basicSetup,
          language.of(javascript()),
          keymap.of(defaultKeymap),
          tabSize.of(EditorState.tabSize.of(2)),
          arenaTheme,
        ],
      }),
      parent: element,
    });

    return () => view.destroy();
  }, [element]);

  return { ref };
}

let arenaTheme = EditorView.theme({
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