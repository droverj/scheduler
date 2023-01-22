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
// const STATUS = "STATUS";
const FORM = "FORM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log(props);
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  function onCancel() {
    console.log("onCancel was clicked in Appointment")
    transition(SHOW);
  }

  function onConfirm() {
    props.cancelInterview(props.id)
    transition(EMPTY);
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
        />
      )}
      {mode === CREATE && <Form onSave={save} id={props.id} interview={props.interview} interviewers={props.interviewers} onCancel={() => back()} />}
      {mode === CONFIRM && <Confirm onCancel={onCancel} onConfirm={onConfirm} message={"Are you sure you want to delete?"} />}
    </article>
  );
}