import React, { Component, useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
axios.defaults.baseURL = 'https://spark-connecto.herokuapp.com';

const EventSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [eventList, setEventList] = useState([]);

  const fetchResults = () => {
    console.log("fetching now...");
    axios.post("/api", { "search_input": searchInput })
      .then(response => {
        console.log(response.data.events_results);
        let data = response.data.events_results;
        setEventList(data);
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField id="searchEventField" label="Event Search" variant="outlined" onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={fetchResults}>Search</Button>
        </Grid>

        {eventList.map(event => (
          <Grid item xs={8} alignSelf="center">
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h4">
                  {event.title}
                </Typography>
                <Typography variant="h6">
                  {event.date.start_date}
                </Typography>
                <Typography variant="body2">
                  {event.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

      </Grid>
    </>
  )
}

export default EventSearch;