import React from "react";
import PropTypes from "prop-types";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

/**
 *
 * @param {Array} props: array of objects containing interviewers (5)
 * @param {Null/Number} props: value of interviewer's ID if selected, else null
 * @param {Function} props: onChange
 * @returns the list of interviewer items
 */
export default function InterviewerList(props) {
  const interviewers = props.interviewers;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewer) => (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.value}
            setInterviewer={() => props.onChange(interviewer.id)}
          />
        ))}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
