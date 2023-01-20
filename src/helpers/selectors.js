// returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  let result = [];

  const appointments = state.days.filter(appointment => appointment.name === day)

  if (!appointments.length || !state.days.length) {
    return result;
  }

  const interviewerIds = appointments[0].appointments;
  const interviewers = Object.values(state.appointments);

  result = interviewerIds.map(i => {
    for (const id of interviewers) {
      if (i === id.id) {
        return id;
      }
    }
  })
  return result;
}

// returns a new object containing the interview data when passed an object that contains the interviewer
export function getInterview(state, interview) {
  const result = {};
  if (interview === null) {
    return interview
  }

  const interviewerId = interview.interviewer
  result["student"] = interview.student;
  result["interviewer"] = {};
  result["interviewer"]["id"] = interviewerId;
  result["interviewer"]["name"] = state.interviewers[interviewerId].name;
  result["interviewer"]["avatar"] = state.interviewers[interviewerId].avatar;

  return result;
}

// returns an array of interviewers for that day
export function getInterviewersForDay(state, day) {
  let result = [];

  const appointments = state.days.filter(appointment => appointment.name === day)

  if (!appointments.length || !state.days.length) {
    return result;
  }

  const interviewerIds = appointments[0].interviewers;
  const interviewers = Object.values(state.interviewers);

  result = interviewerIds.map(i => {
    for (const id of interviewers) {
      if (i === id.id) {
        return id;
      }
    }
  })
  return result;
}