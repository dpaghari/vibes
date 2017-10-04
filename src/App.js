import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
const moment = require('moment');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          name: 'Dev Standup',
          createdAt: Date.now(),
          done: false,
          eventDate: moment(Date.now()).format('MMM Do YYYY'),
          location: 'AppDirect HQ'
        },
        {
          name: 'Holiday Party',
          createdAt: Date.now(),
          done: false,
          eventDate: moment(Date.now()).format('MMM Do YYYY'),
          location: 'Exploratorium'
        },
        {
          name: 'Film Night at the Park',
          createdAt: Date.now(),
          done: true,
          eventDate: moment(Date.now()).format('MMM Do YYYY'),
          location: 'Dolores Park'
        }
      ]
    };
  }

  render() {
    return (
      <div className="site-wrapper">
        <h1>Daryo</h1>
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

class EventList extends React.Component {
  constructor(props) {
    super();
    this.filterEvents = this.filterEvents.bind(this);
    this.state = {
      events: props.events
    };
  }

  filterEvents(e) {
    this.setState({
      events: (this.props.events.filter(event => event.name.toLowerCase().includes(e.target.value)))
    });
  }

  render() {
    return (
      <div>
        <input type="text"
         onChange={this.filterEvents}/>
        <ul>
          {this.renderEvents()}
        </ul>
      </div>
    );
  }

  renderEvents() {
    let events = this.state.events;
    console.log(events);
    return events.map((event, idx) => {
        return (
          <div key={idx}>
            <h3>{event.name}</h3>
            <h5>{event.eventDate}</h5>
            <h6>{event.location}</h6>
          </div>
        );
    });
  }
}
