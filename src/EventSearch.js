import React, { Component } from 'react'
import axios from 'axios';
axios.defaults.baseURL = 'https://spark-connecto.herokuapp.com';
export class EventSearch extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         search_input: '',
         event_list: ''
      }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    } 

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('/api', this.state)
            .then(response => {
                console.log(JSON.stringify(response.data.events_results, null, 3))
                this.setState({event_list: JSON.stringify(response.data.events_results, null, 3)})
            })
            .catch(error => {
                console.log(error)
            })
    }
  render() {
      const { search_input } = this.state
    return (
      <div>
          <div>
              <form onSubmit={this.submitHandler}>
                  <div>
                      <input type="text" name="search_input" value={search_input} onChange={this.changeHandler}/> 
                  </div>
                  <button type="submit">Search</button>
              </form>
          </div>
          <div>
              <p>{this.state.event_list}</p>
          </div>
      </div>
    )
  }
}

export default EventSearch