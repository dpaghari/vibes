import './App.css';
// Custom Components
import Playlist from './Playlist';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
const moment = require('moment');
const songs = [
  {
    songName: 'Nikes',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Ivy',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Pink and White',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Self Control',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Good Guy',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Nights',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Skyline To',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Seigfried',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'White Ferrari',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Godspeed',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Pretty Sweet',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Solo',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Solo(Reprise)',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  },
  {
    songName: 'Facebook Story',
    artistName: 'Frank Ocean',
    albumName: 'Blonde',
    albumImg: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg'
  }

];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      songs
    };
  }

  render() {
    return (
      <div className="site-wrapper">
        <Playlist songs={this.state.songs}/>
      </div>
    );
  }
}
