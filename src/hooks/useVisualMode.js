import { useState } from "react";

const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  const transition = function (newMode, replace = false) {
    const newHist = [...history];

    if (replace) {
      newHist.push(newMode);
    }

    if (!replace) {
      newHist.push(mode);
      newHist.push(newMode);
    }

    setMode(newMode);
    setHistory(newHist);
  };

  const back = function () {
    if (history.length <= 0) {
      return;
    }

    if (history.length > 0) {
      const newHist = [...history];
      newHist.pop();

      setMode(newHist[newHist.length - 2]);
      setHistory(newHist);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
