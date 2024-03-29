import React from "react";

/**
 * 
 * @param {Function} props: onAdd
 * @returns an empty view for available appointment spots
 */
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
