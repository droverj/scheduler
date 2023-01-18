//... returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  let result = [];

  if (!state.days.length) {
    return result;
  }

  const appointments = state.days.filter(appointment => appointment.name === day)
  
  if (!appointments.length) {
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