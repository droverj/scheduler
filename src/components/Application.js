import React from "react";

import "components/Application.scss";
import DayList from './DayList';
import Appointment from '../components/Appointment'
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from '../hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {}
  // });

  // function resetDatabase() {
  //   axios.get("/api/debug/reset").then(res => {console.log(res)})
  // }
  // resetDatabase();

  const interviewers = getInterviewersForDay(state, state.day);
  // const dailyAppointments = getAppointmentsForDay(state, state.day);

  // const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));


  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      // const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          // id={appointment.id}
          // time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    });

  // useEffect(() => {
  //   Promise.all([
  //     axios.get('api/days'),
  //     axios.get('api/appointments'),
  //     axios.get('api/interviewers')
  //   ]).then((all) => {
  //     setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  //   })
  // }, []);

  // function bookInterview(id, interview) {
  //   console.log("book interview called")
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.put(`/api/appointments/${id}`, { interview })
  //     .then(response => {
  //       setState({ ...state, appointments })
  //     })
  //     .catch(error => {
  //       console.log('There was an error!', error);
  //       return error;
  //     });
  // }

  // function cancelInterview(id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };

  //   return axios.delete(`/api/appointments/${id}`)
  //     .then(response => {
  //       setState({ ...state, appointments })
  //     })
  //     .catch(error => {
  //       console.log('There was an error!', error);
  //       return error;
  //     });
  // }

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
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}