import React from "react";

import DayListItem from './DayListItem';

export default function DayList (props) {
  const items = props.days;

  return (
    <ul>
      {items.map(item => <DayListItem 
      key={item.id}
      name={item.name}
      spots={item.spots}
      selected={item.days === props.day}
      setDay={props.setDay} />)}
    </ul>
  );
}