import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
const moment = require('moment');

export default class Playlist extends React.Component {
  constructor(props) {
    super();
    this.filterList = this.filterList.bind(this);
    this.state = {
      songs: props.songs,
      addingSong: false
    };
  }

  filterList(e) {
    this.setState({
      songs: (this.props.songs.filter(song => song.songName.toLowerCase().includes(e.target.value)))
    });
  }

  showSongForm() {
    this.setState({addingSong: true});
  }

  render() {
    return (
      <div className="playList">
        <div className="playList__img-wrapper">
          <h1>Vibes</h1>
          <img className="playList__img" src="https://images.pexels.com/photos/387982/pexels-photo-387982.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"/>
        </div>
        <ul>
          { this.renderSongs() }
        </ul>
      </div>
    );
  }

  renderAddSongForm() {
    if(this.state.addingSong) {
      return (
        <form className="songList__songForm" onSubmit={this.addNewSong.bind(this)}>
          <label>Song Name:</label>
          <input ref="songName" type="text"/><br/>
          <label>Song Location:</label>
          <input ref="songLocation" type="text"/><br/>
          <label>Song Date:</label>
          <input ref="songDate" type="date"/><br/>
          <label>Description</label>
          <textarea ref="songNotes" cols="30" rows="6"/>
          <input type="submit"/>
          <hr/>
        </form>
      );
    }
    else return null;
  }

  addNewSong(e) {
    e.preventDefault();
    let { songName, songLocation, songDate, songNotes } = this.refs;
    let newSong = {
      name: songName.value,
      location: songLocation.value,
      songDate: moment(songDate.value).format('MMM Do YYYY'),
      createdAt: Date.now(),
      done: false,
      notes: songNotes.value
    };

    this.state.songs.push(newSong);
    songName.value = songLocation.value = songDate.value = songNotes.value = '';
    this.setState({
      songs: this.state.songs
    });
  }

    renderSongs() {
    let songs = this.state.songs;
    return songs.map((song, idx) => {
        const { songName, albumName, artistName, albumImg } = song;
        return (
          <li key={ idx }>
            <img src={albumImg} alt={albumImg}/>
            <div className="songInfo">
              <h3>{songName}</h3>
              <h5>{artistName}</h5>
              <h6>{albumName}</h6>
            </div>
          </li>
        );
    });
  }
}
