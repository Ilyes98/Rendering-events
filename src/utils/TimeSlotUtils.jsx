export const generateTimeSlots = (startTime, endTime, timeSlotHeight) => {
    const timeSlots = [];

    // Iterate over each hour from start time to end time
    for (let hour = startTime; hour <= endTime; hour++) {
      timeSlots.push({
        key: hour,
        top: (hour - startTime) * timeSlotHeight,
        label: hour.toString(),
      });
    }

    return timeSlots;
  };
