import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
const moment = require('moment');

export default class EventList extends React.Component {
  constructor(props) {
    super();
    this.filterEvents = this.filterEvents.bind(this);
    this.state = {
      events: props.events,
      addingEvent: false
    };
  }

  filterEvents(e) {
    this.setState({
      events: (this.props.events.filter(event => event.name.toLowerCase().includes(e.target.value)))
    });
  }

  showEventForm() {
    this.setState({addingEvent: true});
  }

  render() {
    return (
      <div className="eventList">
        <button onClick={this.showEventForm.bind(this)}>Add New Event</button><br/>
        { this.renderAddEventForm() }
        <label>Search Events:</label>
        <input type="text"
         onChange={ this.filterEvents }/>
        <ul>
          { this.renderEvents() }
        </ul>
      </div>
    );
  }

  renderAddEventForm() {
    if(this.state.addingEvent) {
      return (
        <form className="eventList__eventForm" onSubmit={this.addNewEvent.bind(this)}>
          <label>Event Name:</label>
          <input ref="eventName" type="text"/><br/>
          <label>Event Location:</label>
          <input ref="eventLocation" type="text"/><br/>
          <label>Event Date:</label>
          <input ref="eventDate" type="date"/><br/>
          <label>Description</label>
          <textarea ref="eventNotes" cols="30" rows="6"/>
          <input type="submit"/>
          <hr/>
        </form>
      );
    }
    else return null;
  }

  addNewEvent(e) {
    e.preventDefault();
    let { eventName, eventLocation, eventDate, eventNotes } = this.refs;
    let newEvent = {
      name: eventName.value,
      location: eventLocation.value,
      eventDate: moment(eventDate.value).format('MMM Do YYYY'),
      createdAt: Date.now(),
      done: false,
      notes: eventNotes.value
    };

    this.state.events.push(newEvent);
    eventName.value = eventLocation.value = eventDate.value = eventNotes.value = '';
    this.setState({
      events: this.state.events
    });
  }

  renderEvents() {
    let events = this.state.events;
    return events.map((event, idx) => {
        return (
          <li key={ idx }>
            <h3>{event.name}</h3>
            <h5>{event.eventDate}</h5>
            <h6>{event.location}</h6>
            <p>{event.notes}</p>
          </li>
        );
    });
  }
}
