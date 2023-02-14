import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

/**
 * 
 * @param {Array} props: an array of interviewers objects (5)
 * @param {Function} props: onCancel
 * @param {Function} props: onSave
 * @returns the form view for saving and editing appointments
 */
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  /**
   * Resets the form values
   */
  function reset() {
    setStudent("");
    setInterviewer(null);
  }

  /**
   * Resets the form values and transitions back
   */
  function cancel() {
    reset();
    props.onCancel();
  }

  /**
   * Verifies the form requirements are met and returns an error otherwise
   */
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(e) => cancel()}>
            Cancel
          </Button>
          <Button confirm onClick={(e) => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
