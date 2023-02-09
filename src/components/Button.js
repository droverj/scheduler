import React from "react";
import classNames from "classnames";
import "components/Button.scss";

/**
 *
 * @param {*} props
 * @returns a button component with styling to indicate to the user they can safely proceed or to proceed with caution
 */
export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
