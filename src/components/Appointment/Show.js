import React from "react";

/**
 * 
 * @param {Object} props: interview object containing interviewer object (id, name, avatar) and student name
 * @param {Function} props: onDelete
 * @param {Function} props: onEdit
 * @returns a view for an appointment after it has successfully saved
 */
export default function Show(props) {
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">
          {props.interview && props.interview.student}
        </h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">
            {props.interview && props.interview.interviewer.name}
          </h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
          />
        </section>
      </section>
    </main>
  );
}
