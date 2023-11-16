import React from 'react';
import Calendar from './components/Calendar';
import events from './input.json';

function App() {
  return <Calendar events={events} />; // Rendering the Calendar component and passing the 'events' data as a prop
}

export default App;