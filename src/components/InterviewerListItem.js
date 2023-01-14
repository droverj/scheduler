import React from "react";
import classNames from 'classnames';

import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  
  const classNamesObject = classNames("interviewers__item", {
    "--selected": props.selected,
  });

  const interviewersItemClass = classNamesObject.replace(" ", "");

  return (
    <li className={interviewersItemClass}>
      <img
        className="interviewers__item-image"
        onClick={() => props.setInterviewer(props.id)}
        key={props.id}
        src={props.avatar}
        alt={props.name}
      />
     { props.selected && props.name }
    </li>
  );
}