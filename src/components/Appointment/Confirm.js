import React from "react";
import Button from "../Button";

/**
 * 
 * @param {String} props: message
 * @param {Function} props: onCancel
 * @param {Function} props: onConfirm
 * @returns a confirm view before cancellation
 */
export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>
          Cancel
        </Button>
        <Button danger onClick={props.onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
