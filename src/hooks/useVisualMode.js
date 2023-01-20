import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setHistory([...history, mode])
    setMode(mode);

    if (replace === true) {
      setHistory(mode);
    }
  }

  function back() {
    if (history.length <= 1) {
      setMode(initial);
    }
    if (history.length > 1) {
      history.pop()
      const last = history.pop();
      setMode(last);
    }
  }
  return { mode, transition, back };
}