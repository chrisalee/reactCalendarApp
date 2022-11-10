import React, { useState } from "react";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

//test data
const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 10, 10),
    end: new Date(2022, 10, 10),
  },
  {
    title: "Vacation",
    start: new Date(2022, 10, 11),
    end: new Date(2022, 10, 30),
  },
  {
    title: "Conference",
    start: new Date(2022, 10, 11),
    end: new Date(2022, 10, 11),
  },
];

const App = () => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
  });

  const [allEvents, setAllEvents] = useState(events);

  const handleAddEvent = () => {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("EVENTS TIME OVERLAP");
        break;
      }
    }
    setAllEvents([...allEvents, newEvent]);
  };

  return (
    <div className="app">
      <h1>CALENDAR</h1>
      <h2>Add New Event</h2>
      <div className="cal__entry">
        <input
          type="text"
          placeholder="Add Title"
          className="cal__titleInput"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          className="cal__datePicker"
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          className="cal__datePicker"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button className="cal__btn" onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
};

export default App;
