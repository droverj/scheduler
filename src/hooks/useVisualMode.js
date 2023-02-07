import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  console.log("starting history: ", history);

  // if there is an error saving we would want to replace
  // the Status view with the Error view
  function transition(nextMode, replace = false) {
    if(replace){
      // WHY IS IT GOING TO SHOW INSTEAD OF CATCHING THE TRUE
      console.log("REPLACING")
      setHistory(prev => prev.splice(2, 1, nextMode));
      console.log("history after splice: ", history)
      setHistory(prev => [...prev, nextMode]);
      console.log("final history for replace = true: ", history)
      }else{
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