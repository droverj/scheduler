import React from 'react';
import classNames from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  
  const classNamesObject = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots === 0
  });

  const dayListClass = classNamesObject.replace(" ", "");
  console.log(dayListClass)

  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}