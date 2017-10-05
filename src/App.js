import './App.css';
// Custom Components
import EventList from './EventList';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
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
          location: 'AppDirect HQ',
          notes: 'Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat.'
        },
        {
          name: 'Holiday Party',
          createdAt: Date.now(),
          done: false,
          eventDate: moment(Date.now()).format('MMM Do YYYY'),
          location: 'Exploratorium',
          notes: 'Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat.'
        },
        {
          name: 'Film Night at the Park',
          createdAt: Date.now(),
          done: true,
          eventDate: moment(Date.now()).format('MMM Do YYYY'),
          location: 'Dolores Park',
          notes: 'Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat.'
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
