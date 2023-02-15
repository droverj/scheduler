/**
 * Returns an array of appointment objects depending on the currently selected day
 * @param {Object} state: current state for the selected day
 * @param {String} name: name of currently selected day
 * @returns {Array} an array of objects containing appointment details for the selected day
 */
export function getAppointmentsForDay(state, day) {
  let result = [];

  // returns an array containing an object for the selected day's state
  const getAppointment = state.days.filter(
    appointment => appointment.name === day
  );

  if (!state.days|| !getAppointment.length) {
    return result;
  }

  const appointment = getAppointment[0];

  // loops through the appointments array (ids) for the selected day
  for (const id of appointment.appointments) {
    result.push(state.appointments[id])
  }
  return result;
}

/**
 * @param {Object} state: current state for the selected day
 * @param {Null/Object} interview: an object containing the student's name and interviewer's id if an appointment is scheduled, else null
 * @returns {Object} an object containing the interview data when from an object that contains the interviewer value
 */
export function getInterview(state, interview) {
  const result = {};

  if (interview === null) {
    return interview;
  }

  const interviewerId = interview.interviewer;
  result["student"] = interview.student;
  result["interviewer"] = {};
  result.interviewer["id"] = interviewerId;
  result.interviewer["name"] = state.interviewers[interviewerId].name;
  result.interviewer["avatar"] = state.interviewers[interviewerId].avatar;

  return result;
}

/**
 * Returns an array of interviewer objects depending on the currently selected day
 * @param {Object} state: current state for the selected day
 * @param {String} name: name of currently selected day
 * @returns {Array} an array of objects containing the interviewers for the selected day
 */
export function getInterviewersForDay(state, day) {
  let result = [];

  // returns an array containing an object for the selected day's state
  const getAppointment = state.days.filter(
    appointment => appointment.name === day
  );

  if (!state.days || !getAppointment.length) {
    return result;
  }

  const appointment = getAppointment[0];

  // loops through the interviewers array (ids) for the selected day
  for (const id of appointment.interviewers) {
    result.push(state.interviewers[id])
  }
  return result;
}
