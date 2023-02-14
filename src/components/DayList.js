import React from "react";
import DayListItem from './DayListItem';

/**
 * 
 * @param {Array} props: array of days objects (5)
 * @param {String} props: value for selected day 
 * @param {Function} props: onChange
 * @returns the list of day list items
 */
export default function DayList (props) {
  const days = props.days;

  return (
    <ul>
      {days.map(day => <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange} />)}
    </ul>
  );
}