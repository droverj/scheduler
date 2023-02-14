import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

/**
 *
 * @param {String} props: interviewer's name
 * @param {String} props: interviewer's avatar
 * @param {Boolean} props: interviewer is selected
 * @param {Function} props: setInterviewer
 * @returns each individual interviewer item
 */
export default function InterviewerListItem(props) {
  const classNamesObject = classNames("interviewers__item", {
    "--selected": props.selected,
  });

  const interviewerClass = classNamesObject.replace(" ", "");

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
