import React from 'react';
import './App.css';
import EventSearch from './EventSearch';
import axios from 'axios';
axios.defaults.baseURL = 'https://spark-connecto.herokuapp.com';

function App() {

  return (
    <div className="App">
      <h1>Search Events!</h1>
      <EventSearch />
    </div>
  );

}

export default App;
