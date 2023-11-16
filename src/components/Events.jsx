import React, { useState, useEffect } from 'react';
import { calculateTopPosition, calculateHeight } from '../utils/EventUtils';

const Event = ({ event, left, width, timeSlotHeight }) => {
  const [eventTop, setEventTop] = useState(0);
  const [eventHeight, setEventHeight] = useState(0);

  useEffect(() => {
    const top = calculateTopPosition(event.start, timeSlotHeight); // Calculate the top position
    const height = calculateHeight(event.duration, timeSlotHeight); // Calculate the height based on the event's duration

    setEventTop(top); // Set the top position state
    setEventHeight(height); // Set the height state
  }, [event, timeSlotHeight]);

  return (
    <div className="event" style={{ top: eventTop, left, height: eventHeight, width }}>
      <div className="event-time">{event.id}</div>
    </div>
  );
};

export default Event;
