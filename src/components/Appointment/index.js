import React from "react";

import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM"
const DELETING = "DELETING";
const SAVING = "SAVING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function onConfirm() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={(e) => e = transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={e => transition(CONFIRM)}
          onEdit={e => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form onSave={save} id={props.id} interview={props.interview} interviewers={props.interviewers} onCancel={() => back()} />}
      {mode === CONFIRM && <Confirm onCancel={e => transition(SHOW)} onConfirm={onConfirm} message={"Are you sure you want to delete?"} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} id={props.id} interview={props.interview} interviewers={props.interviewers} onCancel={() => back()} />}
      {mode === ERROR_DELETE && <Error onClose={() => back()} message={"Could not delete appointment."} />}
      {mode === ERROR_SAVE && <Error onClose={() => back()} message={"Could not save appointment."} />}
    </article>
  );
}