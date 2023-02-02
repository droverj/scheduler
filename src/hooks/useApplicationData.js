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
      setState(prev => ({ ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data }));
    })
  }, []);


  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    try {
      const response = await axios.put(`/api/appointments/${id}`, { interview });
      setState({ ...state, appointments });
    } catch (error) {
      console.log('There was an error!', error);
      return error;
    }
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

    try {
      const response = await axios.delete(`/api/appointments/${id}`);
      setState({ ...state, appointments });
    } catch (error) {
      console.log('There was an error!', error);
      return error;
    }
  }

  return { state, setDay, bookInterview, cancelInterview }
}