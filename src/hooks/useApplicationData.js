import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = (day) => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState((prev) => ({
        ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }))
    })
  }, []);

  /* GARY'S BREAKOUT ON UPDATE SPOTS */ 
  // const updateSpots = function(dayName, days, appointments) {
  //   const newDays = [...days];
  
  //   // get the day object
  //   const index = newDays.findIndex(day => day.name === dayName);
  //   const dayObj = newDays[index];
  
  //   let spots = 0;
  //   for (const id of dayObj.appointments) {
  //     const appointment = appointments[id];
  //     if(!appointment.interview) {
  //       spots++;
  //     }
  //   }
   
  //   const newDay = {...dayObj, spots};

  //   newDays.splice(index, 1, newDay);
  //   // newDays[index] = newDay;
  
  //   return newDays;
  // };

  /* FRANCIS BREAKOUT ON UPDATE SPOTS
    --> takes in state and day, and returns update state
  */
  const updateSpots = (state, day) => {
    const currentDay = day || state.day;
  
    const currentDayObj = state.days.find(dayObj => dayObj.name === currentDay);
    const currentDayObjIndex = state.days.findIndex(dayObj => dayObj.name === currentDay);
  
    const listOfAppointments = currentDayObj.appointments;
  
    const appointmentsAvailable = listOfAppointments.filter(appointmentId => !state.appointments[appointmentId].interview);
  
    const newSpots = appointmentsAvailable.length;
    
    const updatedState = { ...state };
    updatedState.days = [...state.days];
    
    const updatedDay = { ...currentDayObj };
    updatedDay.spots = newSpots;
    updatedState.days[currentDayObjIndex] = updatedDay;
  
    return updatedState;
  }
 

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id], 
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
    .put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then((response) => {
      setState(updateSpots({...state, appointments}))
    })

  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
    .delete(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then((response) => {
      setState(updateSpots({...state, appointments}))
    })

  }

  return { state, setDay, bookInterview, cancelInterview };
}