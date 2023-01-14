import React, { useState } from "react";

import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const [interviewer, setInterviewer] = useState("");
  // console.log(props);


  function getName() {
    if (props.id === interviewer) {
      return props.name;
    }
  }

  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        onClick={() => setInterviewer(props.id)}
        key={props.id}
        src={props.avatar}
        alt={props.name}
      />
      {getName()}
    </li>
  );
}