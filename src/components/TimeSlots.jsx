import React from 'react';
import { generateTimeSlots } from '../utils/TimeSlotUtils';

const TimeSlots = ({ startTime, endTime, timeSlotHeight }) => {
  const timeSlots = generateTimeSlots(startTime, endTime, timeSlotHeight);

  return (
    <div className="time-slots-container">
      {timeSlots.map(({ key, top, label }) => (
        <div key={key} className="time-slot-item" style={{ top }}>
          {label}
        </div>
      ))}
    </div>
  );
};

export default TimeSlots;
