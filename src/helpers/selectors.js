export function getAppointmentsForDay(state, day) {
  const output = [];
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
};

// The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null.
export function getInterview(state, interview) {
  const output = {};

  if (!interview) {
    return null;
  }

  output['student'] = interview.student;
  output['interviewer'] = state.interviewers[interview.interviewer];

  return output;
  
};