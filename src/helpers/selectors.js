export function getAppointmentsForDay(state, day) {
  let output = [];
  // find the object in our state.days array who's name matches the provided day.

  const dayArr = state.days.filter((x) => x.name === day);

  if (dayArr.length === 0) {
    return output;
  }

  // access that specific days appointment array
  const appointmentsArr = dayArr[0].appointments;

  // iterate through appointment array and compare where it's id matches the id of states.appointments.

  for (const x of appointmentsArr) {
    output.push(state.appointments[x]);
  }

  return output;
}
