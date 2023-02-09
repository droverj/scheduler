import { useState } from "react";

/**
 *
 * @param {*} initial
 * @returns a custom hook for determining which mode a user should view based on current or previous state
 */
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   *
   * @param {*} nextMode
   * @param {*} replace
   * Transitions to the next mode and saves the history
   * If replace = true, skip transitioning to the next mode and replace it with the Error mode
   */
  function transition(nextMode, replace = false) {
    if (replace) {
      setHistory((prev) => prev.splice(2, 1, nextMode));
    } else {
      setHistory((prev) => [...prev, nextMode]);
    }
    setMode(nextMode);
  }

  /**
   * Returns the user to the previous mode
   */
  function back() {
    if (history.length <= 1) {
      setMode(initial);
    }
    if (history.length > 1) {
      history.pop();
      const last = history.pop();
      setMode(last);
    }
  }
  return { mode, transition, back };
}
