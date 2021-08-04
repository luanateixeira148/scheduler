import React, { useState } from "react";
import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

// const InterviewerList = function (props) {
//   const [interviewer, setInterviewer] = useState("");

//   const interviewers = props.interviewers.map((interviewer) => {
//     return (
//       <section className="interviewers">
//         <h4 className="interviewers__header text--light">Interviewer</h4>
//         <ul className="interviewers__list">
//           <InterviewerListItem
//             key={interviewer.id}
//             name={interviewer.name}
//             avatar={interviewer.avatar}
//             selected={interviewer.id === props.interviewer}
//             setInterviewer={setInterviewer}
//           />
//         </ul>
//       </section>
//     )
//   });
//   return interviewers;
// };

const InterviewerList = function (props) {
  const [interviewer, setInterviewer] = useState("");

  // maps the new interviewers array with the info from the db
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={setInterviewer}
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
