import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

// temporary database
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

// temporary db
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller",
      interviewer: {
        id: 1,
        name: "Mark Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Miller-Jones Lydia",
      interviewer: {
        id: 1,
        name: "Michael Scott",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  },
  {
    id: 6,
    time: "5pm",
    interview: {
      student: "Barney Stinson",
      interviewer: {
        id: 1,
        name: "Ted Mosby",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 7,
    time: "6pm",
  },
  {
    id: 8,
    time: "7pm",
    interview: {
      student: "Monica Geller",
      interviewer: {
        id: 1,
        name: "Carie Bradshaw",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {

  const [day, setDay] = useState("Monday");

  const apointments = appointments.map((appointment) => {
    return (
      <Appointment 
        key={appointment.id} 
        id={appointment.id} 
        time={appointment.time} 
        interview={appointment.interview} 
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {apointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
