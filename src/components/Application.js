import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "../helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller",
//       interviewer: {
//         id: 1,
//         name: "Mark Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Miller-Jones Lydia",
//       interviewer: {
//         id: 1,
//         name: "Michael Scott",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   },
//   {
//     id: 7,
//     time: "6pm",
//   },
//   {
//     id: 8,
//     time: "7pm",
//     interview: {
//       student: "Monica Geller",
//       interviewer: {
//         id: 1,
//         name: "Carie Bradshaw",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

export default function Application(props) {

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState({...state, day});
  // const setDays = (days) => setState(prev => ({...prev, days}));


  // useEffect(() => {
  //   axios
  // .get("http://localhost:8001/api/days")
  // .then((response) => {
  //   setDays(response.data)
  // })
  // }, [])

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments")
    ]).then((all) => {
      setState((prev) => ({
        ...prev, days: all[0].data, appointments: all[1].data
      }))
    })
  });
  // }, [])

  const apointments = dailyAppointments.map((appointment) => {
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
            days={state.days}
            day={state.day}
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
