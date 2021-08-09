import { useState } from "react";


// a Hook that allows our Appointment components to keep track of the "mode" that they are in, as a user interacts with them to do things like create a new appointment, delete an appointments, etc.
const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  // take in a new mode and update the mode state with the new value.
  const transition = function (newMode, replace = false) {
    const newHist = [...history];
    
    //When replace is true then set the history to reflect that we are replacing the current mode.
    if (replace) {
      newHist.push(newMode);
    }

    if (!replace) {
      newHist.push(mode);
      newHist.push(newMode);
    }

    // add the new mode to our history
    setMode(newMode);
    setHistory(newHist);
  };

  // allow us to return to the previous mode
  const back = function () {
    if (history.length < 1) {
      return;
    }

    if (history.length >= 1) {
      const newHist = [...history];
      newHist.pop();

      // set the mode to the previous item in our history array
      setMode(newHist[newHist.length - 2]);

      setHistory(newHist);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
