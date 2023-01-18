//... returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  let result = [];

  const appointments = state.days.filter(appointment => appointment.name === day)

  if (!appointments.length || !state.days.length) {
    return result;
  }

  const appointmentIds = appointments[0].appointments;
  const apps = Object.values(state.appointments);

  result = appointmentIds.map(i => {
    for (const id of apps) {
      if (i === id.id) {
        return id;
      }
    }
  })
  return result;
}

// The function should return a new object containing the interview
// data when we pass it an object that contains the interviewer
function getInterview(state, interview) {

}

// expected output: 
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }

