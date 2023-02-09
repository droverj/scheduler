import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const SAVING = "SAVING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

/**
 *
 * @param {*} props
 * @returns a view determined by the mode from the useVisualMode custom hook
 */
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  /**
   *
   * @param {*} name - student name
   * @param {*} interviewer - selected interviewer
   * Captures the student name and interviewer.
   * Transitions to STATUS mode for SAVING.
   * Books the interview using the captured values and transitions to SHOW mode.
   * If error, transition to ERROR_SAVE mode to display the error.
   */
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  }

  /**
   * Transitions to STATUS mode for DELETING.
   * Cancels the interview and transitions to EMPTY mode.
   * If error, transition to ERROR_DELETE mode to display the error.
   */
  function onConfirm() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={(e) => (e = transition(CREATE))} />}
      {mode === SHOW && (
        <Show
          interview={props.interview}
          onDelete={(e) => transition(CONFIRM)}
          onEdit={(e) => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save} interviewers={props.interviewers} onCancel={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={onConfirm}
          message={"Are you sure you want to delete?"}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message={"Could not cancel appointment."} />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message={"Could not book appointment."} />
      )}
    </article>
  );
}
