import { useState, useEffect } from "react";
import axios from 'axios';

import { getAppointmentsForDay } from "helpers/selectors";

export default function useControlledInput(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

//  const id = 1
  // function updateSpots(id) {
  //   let count = 0;
  //   const result = getAppointmentsForDay(state, state.day);
  //   result.forEach(id => {
  //     if (id.interview === null) {
  //       count += 1;
  //     }
  //   })

  //   state.days.forEach(id => {
  //     if (id.name === state.day) {
  //       id.spots = count;
  //     }
  //   })
  // }
//  const id = 0;
  function updateSpots(id) {
    // console.log(state.days[id])
  //  id = state.day;
    let count = 0;
    const result = getAppointmentsForDay(state, state.day);

    result.forEach(id => {
      if (id.interview === null) {
        count += 1;
      }
    })
    // console.log(count);

    let obj = state.days[id].spots
    console.log(obj)
    obj = count;

  }

  // updateSpots(id);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        updateSpots(id);
        setState({ ...state, appointments })
      })
      .catch(error => {
        console.log('There was an error!', error);
        return error;
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        updateSpots(id);
        setState({ ...state, appointments })
      })
      .catch(error => {
        console.log('There was an error!', error);
        return error;
      });
  }

  return { state, setDay, bookInterview, cancelInterview }
}