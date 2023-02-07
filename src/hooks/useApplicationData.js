import { useState, useEffect } from "react";
import axios from 'axios';

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
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  }, []);

  function updateSpots(appointmentId) {
    const interview = state.appointments[appointmentId].interview;
    const currentDay = state.days.filter(day => day.name === state.day);
    const dayId = currentDay[0].id;
    let spots = currentDay[0].spots;

    if (!interview) {
      spots -= 1;
    } else {
      spots += 1;
    }

    const day = {
      ...state.days[dayId - 1],
      spots: spots
    }

    const days = [
      ...state.days
    ];

    days[0] = day;
    return days;
  }

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    await axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(id);
        console.log("UPDATE DAYS CALLED FOR BOOKING")
        setState({ ...state, appointments, days })
        console.log("STATE SET FOR BOOKING")
      })
      .catch((error) => {
        console.log('There was an error!', error);
        return error;
      })
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    await axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(id);
        console.log("UPDATE SPOTS ON DELETE CALLED")
        setState({ ...state, appointments, days });
        console.log("STATE SET FOR DELETE");
      })
      .catch((error) => {
        console.log('There was an error!', error);
        return error;
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}

// Use then/catch instead