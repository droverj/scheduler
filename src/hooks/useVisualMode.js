import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition(nextMode, replace = false) {
    if (replace) {
      setHistory(prev => prev.splice(2, 1, nextMode));
    } else {
      setHistory(prev => [...prev, nextMode]);
    }
    setMode(nextMode);
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