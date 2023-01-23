import React from "react";

import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const CONFIRM = "CONFIRM"
const DELETING = "DELETING";
const SAVING = "SAVING";
const EDIT = "EDIT";

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
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  function onCancel() {
    transition(SHOW);
  }

  function onConfirm() {
    transition(DELETING);
    props.cancelInterview(props.id)
    transition(EMPTY);
  }

  function onEdit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={(e) => e = transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={e => transition(CONFIRM)}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && <Form onSave={save} id={props.id} interview={props.interview} interviewers={props.interviewers} onCancel={() => back()} />}
      {mode === CONFIRM && <Confirm onCancel={onCancel} onConfirm={onConfirm} message={"Are you sure you want to delete?"} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} id={props.id} interview={props.interview} interviewers={props.interviewers} onCancel={() => back()} />}
    </article>
  );
}