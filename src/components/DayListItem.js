import React from 'react';
import classNames from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  
  const classNamesObject = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots === 0
  });

  const dayListClass = classNamesObject.replace(" ", "");

  function formatSpots() {
    if (props.spots ===  0) {
      return 'no spots remaining';
    } else if (props.spots === 1) {
       return '1 spot remaining';
    } else {
      return `${props.spots} spots remaining`;
    }
  }

  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name} </h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}