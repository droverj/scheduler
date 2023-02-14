import React from "react";

/**
 * 
 * @param {String} props: message 
 * @returns a transitioning view with a saving or deleting message and icon
 */
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}
