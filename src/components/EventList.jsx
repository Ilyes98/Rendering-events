import React from 'react';
import { calculateSortedEvents } from '../utils/EventUtils';
import Event from './Events';

const EventList = ({ events, maxEventWidth, eventStartLeft, timeSlotHeight }) => {
  const sortedEvents = calculateSortedEvents(events, maxEventWidth, eventStartLeft, timeSlotHeight);

  return (
    <div className="events-container">
      {/* Render each event with its corresponding width, left position, and time slot height */}
      {sortedEvents.map(({ event, width, left, timeSlotHeight }) => (
        <Event
          key={event.id}
          event={event}
          width={width}
          left={left}
          timeSlotHeight={timeSlotHeight}
        />
      ))}
    </div>
  );
};

export default EventList;
