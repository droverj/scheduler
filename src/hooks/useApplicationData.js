import { useState, useEffect } from "react";
import axios from "axios";

/**
 *
 * @returns a custom hook for controlling the state
 */
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  /**
   *
   * @param {*} appointmentId
   * @returns a day array with the updated state after an interview has been booked or cancelled
   */
  function updateSpots(appointmentId, edit) {
    if (edit) {
      return [...state.days];
    }

    const interview = state.appointments[appointmentId].interview;
    const currentDay = state.days.filter((day) => day.name === state.day);
    const dayId = currentDay[0].id;
    let spots = currentDay[0].spots;

    if (!interview) {
      spots -= 1;
    } else {
      spots += 1;
    }

    const day = {
      ...state.days[dayId - 1],
      spots: spots,
    };

    const days = [...state.days];

    days[0] = day;
    return days;
  }

  /**
   *
   * @param {*} id
   * @param {*} interview
   * Captures the appointment id and interview for selected appointment
   * Creates a copy of the appointment's state and adds the interview
   * Makes an axios call to put the appointment into the API
   * If successful, captures the days array using the updateSpots function
   * Updates the state with the new appointments object and returned days array
   */
  async function bookInterview(id, interview, edit) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    await axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(id, edit);
        setState({ ...state, appointments, days });
      })
      .catch((error) => {
        return error;
      });
  }

  /**
   *
   * @param {*} id
   * Captures the appointment Id
   * Creates a copy of the appointments state and sets the interview to null
   * Makes an axios delete request
   * If successful, updates the spots remaining using the updateSpots function
   * Updates the state using the copy and the returned days array
   */
  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    await axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(id);
        setState({ ...state, appointments, days });
      })
      .catch((error) => {
        return error;
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
