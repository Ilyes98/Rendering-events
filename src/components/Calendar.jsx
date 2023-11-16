import React, { useState, useEffect } from 'react';
import { handleResize } from '../utils/CalendarUtils';
import Header from './Header';
import TimeSlots from './TimeSlots';
import EventList from './EventList';
import '../styles/Calendar.css';

import input from '../input';

const Calendar = () => {
  const [_screenSize, setScreenSize] = useState(0);
  const [events, setEvents] = useState([]);

  const timeSlotHeight = (parseInt(window.screen.availHeight, 10) - 71 - 50) / 13; // Calculate time slot height based on screen height
  const startTime = 9; // Start time for calendar
  const endTime = 21; // End time for calendar
  const maxEventWidth = window.screen.availWidth - 2; // Calculate maximum event width based on screen width
  const eventStartLeft = 2; // Start position for events

  const currentDate = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('fr-FR', options);

  useEffect(() => {
    handleResize(setScreenSize);
  }, []);

  useEffect(() => {
    setEvents(input); // Set events using input data
  }, []);

  return (
    <div className="calendar">
      <Header formattedDate={formattedDate} Header/>
      <TimeSlots startTime={startTime} endTime={endTime} timeSlotHeight={timeSlotHeight} /> 
      <EventList events={events} maxEventWidth={maxEventWidth} eventStartLeft={eventStartLeft} timeSlotHeight={timeSlotHeight} />
    </div>
  );
};

export default Calendar;
