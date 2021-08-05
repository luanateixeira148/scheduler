import React, { useState } from "react";
import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = function (props) {

  // maps the new interviewers array with the info from the db
  const interviewers = props.interviewers.map((interviewer) => {
    console.log('props.setInterviewer', props.setInterviewer)
    return (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  });
  // uses the new mapped array to render the InterviewerList component on the page with all the interviewers
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
};

export default InterviewerList;
