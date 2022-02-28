import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [eventList, seteventList] = useState([]);

  function sayHello() {
    axios.get("https://spark-connecto.herokuapp.com/events")
  .then(response => {
    const result = JSON.stringify(response.data.events_results, null, 3);
    seteventList(result)
  })
  .catch(error => {
    console.log(error);
  })
  }
  
  return (
    <div className="App">
      <h1>Search Events!</h1>
      <button onClick={sayHello}>
        Click to search for events in Boston
      </button>
      <p>{eventList}</p>
    </div>
  );

}

export default App;
