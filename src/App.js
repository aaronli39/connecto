import React from 'react';
import './App.css';
import EventSearch from './EventSearch';
import Photo from './Photo';
import axios from 'axios';
axios.defaults.baseURL = 'https://spark-connecto.herokuapp.com';

function App() {

  return (
    <div className="App">
      <h1>Search Events!</h1>
      <EventSearch />
      <Photo />
    </div>
  );

}

export default App;
