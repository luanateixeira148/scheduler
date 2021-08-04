import React from "react";
import classNames from "classnames/bind";

import "components/InterviewerListItem.scss";

const InterviewerListItem = function (props) {
  // checks if the interviewer is selected and show/hide the name
  const formatInterviewer = function () {
    if (props.selected) {
      return props.name;
    }
    if (!props.selected) {
      return null;
    }
  };

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  console.log(props);
  return (
    <li
      className={interviewerClass}
      onClick={() => props.setInterviewer(props.name)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {formatInterviewer()}
    </li>
  );
};

export default InterviewerListItem;
