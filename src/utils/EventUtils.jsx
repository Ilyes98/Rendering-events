export const sortEvents = (events) => {
  return events.sort((a, b) => {
    const [aHours, aMinutes] = a.start.split(':');
    const [bHours, bMinutes] = b.start.split(':');

    const aDuration = a.duration;
    const bDuration = b.duration;

    const aStartTime = parseInt(aHours) * 60 + parseInt(aMinutes);
    const bStartTime = parseInt(bHours) * 60 + parseInt(bMinutes);

    if (aStartTime - bStartTime === 0) {
      return bDuration - aDuration; // Sort by duration in descending order if start times are the same
    } else {
      return aStartTime - bStartTime; // Sort by start time in ascending order
    }
  });
};

export const checkIfEventOverlapsWithAll = (currentIndex, sortedEvents, overlappedSet) => {
  const MINUTES_PER_HOUR = 60;

  const [currentIndexHours, currentIndexMinutes] = sortedEvents[currentIndex].start.split(':');
  const currentIndexStart = parseInt(currentIndexHours) * MINUTES_PER_HOUR + parseInt(currentIndexMinutes);
  const currentIndexEnd = currentIndexStart + parseInt(sortedEvents[currentIndex].duration);
  let withAll = 1;

  for (const overlappedEventIndex of overlappedSet.values()) {
    const [overlappedEventIndexHours, overlappedEventIndexMinutes] = sortedEvents[overlappedEventIndex].start.split(':');
    const overlappedEventIndexStart = parseInt(overlappedEventIndexHours) * MINUTES_PER_HOUR + parseInt(overlappedEventIndexMinutes);
    const overlappedEventIndexEnd = overlappedEventIndexStart + parseInt(sortedEvents[overlappedEventIndex].duration);

    if (overlappedEventIndex < currentIndex) {
      if (overlappedEventIndexEnd > currentIndexStart) {
        withAll = 0;
      }
    } else if (overlappedEventIndex > currentIndex) {
      if (overlappedEventIndexStart < currentIndexEnd) {
        withAll = 0;
      }
    }

    if (withAll === 1) {
      // My event does not overlap with at least one element in the set
      return false;
    }

    withAll = 1;
  }

  // My event overlaps with all elements in the set
  return true;
};

export const calculateOverlap = (index, sortedEvents, preEventOverlapped, prevCounter) => {
  const { start, duration } = sortedEvents[index];
  const [indexHours, indexMinutes] = start.split(':');
  const indexStart = parseInt(indexHours) * 60 + parseInt(indexMinutes);
  const indexEnd = indexStart + parseInt(duration);

  for (let i = 0; i < sortedEvents.length; i++) {
    if (i !== index) {
      const { start: iStart, duration: iDuration } = sortedEvents[i];
      const [iHours, iMinutes] = iStart.split(':');
      const iStartMinutes = parseInt(iHours) * 60 + parseInt(iMinutes);
      const iEndMinutes = iStartMinutes + parseInt(iDuration);

      if (i < index) {
        if (iEndMinutes > indexStart) {
          if (checkIfEventOverlapsWithAll(i, sortedEvents, preEventOverlapped)) {
            preEventOverlapped.add(i);
            prevCounter += 1;
          }
        }
      } else {
        if (iStartMinutes < indexEnd) {
          if (checkIfEventOverlapsWithAll(i, sortedEvents, preEventOverlapped)) {
            preEventOverlapped.add(i);
          }
        }
      }
    }
  }

  return prevCounter;
};

export const calculateSortedEvents = (events, maxEventWidth, eventStartLeft, timeSlotHeight) => {
  const sortedEvents = sortEvents(events); // Sort events based on start time
  const result = [];

  for (let index = 0; index < sortedEvents.length; index++) {
    const preEventOverlapped = new Set();
    let prevCounter = 0;
    prevCounter = calculateOverlap(index, sortedEvents, preEventOverlapped, prevCounter);

    if (preEventOverlapped.size === 0) {
      // If no overlap, set the event's width to the maximum width and left position to the initial position
      result.push({
        event: sortedEvents[index],
        width: maxEventWidth,
        left: eventStartLeft,
        timeSlotHeight,
      });
    } else {
      // If there is overlap, calculate the width and left position based on the overlap
      const overlappedWidth = maxEventWidth / (preEventOverlapped.size + 1);
      const left = eventStartLeft + overlappedWidth * prevCounter;
      result.push({
        event: sortedEvents[index],
        width: overlappedWidth,
        left,
        timeSlotHeight,
      });
    }
  }

  return result;
};

export const calculateTopPosition = (time, timeSlotHeight) => {
  const startTimeSlot = 9; // Start time slot for the calendar
  const hours = Number(time.split(':')[0]);
  const minutes = Number(time.split(':')[1]);
  return (hours - startTimeSlot) * timeSlotHeight + (minutes / 60) * timeSlotHeight;
};

export const calculateHeight = (duration, timeSlotHeight) => {
  return (duration / 60) * timeSlotHeight;
};

