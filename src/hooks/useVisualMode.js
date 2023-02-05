import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  console.log("starting history: ", history);

  // if there is an error saving we would want to replace
  // the Status view with the Error view
  function transition(nextMode, replace = false) {
    console.log("next mode: ", nextMode);

    if (replace) {
      console.log("REPLACE IS TRUE");
      // setHistory(prev => ([...prev, nextMode]));
      // console.log("history after removal: ", history)
      // setHistory(prev => ([...prev, nextMode]));
    }
    // setHistory(prev => ([...prev, nextMode]));
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