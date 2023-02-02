import React from 'react';
import classNames from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  
  const classNamesObject = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots === 0
  });

  const dayListClass = classNamesObject.replace(" ", "");

  function formatSpots(spots) {
    if (spots ===  0) {
      return 'no spots remaining';
    } else if (spots === 1) {
       return '1 spot remaining';
    } else {
      return `${spots} spots remaining`;
    }
  }

  return (
    <li className={dayListClass}
    onClick={() => props.setDay(props.name)}
    selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name} </h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}