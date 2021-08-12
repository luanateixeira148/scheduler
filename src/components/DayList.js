import React from "react";
import DayListItem from "./DayListItem";

const DayList = function (props) {
  const days = props.days.map((day) => {
    return (
      <ul>
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      </ul>
    );
  });
  return days;
};

export default DayList;
