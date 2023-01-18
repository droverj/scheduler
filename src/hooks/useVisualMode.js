import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);


  function transition(mode) {
    mode = setMode(mode);
  }

  return { mode, transition };
}
