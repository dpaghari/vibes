import SpotifyWebApi from 'spotify-web-api-js';

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
      addingSong: false,
      spotify: {}
    };

  }

  componentDidMount() {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken('BQBgZjupvnVmQfgOD9l3c2wg_kg8R523quEOsnp_p1LPhiZlzxIQEG-6ma92QBrztNXYv5ifmyIj4pc6dc0azga9NuI4GTFwz77_fBP-_r7PKhQ5-GGBNwcCrIi7uQAIkt5Xj9UOQFLdBGk6OIu_61sZBBs-p271PJziXwZgrlwHP5dfgCpl0EnCh0ZmDetCbw39cpuPqaDoFBOfbPkM5ElRxAK_p_vzm5hwqPFIRd2gkpyJQNW5lzkUxxBKAXOkHDzli2KI0uO-nt17cY0beo3viDBvTWz6');
    spotifyApi.getPlaylist('dpaghari', '6JMfX4X1l9yKOYa1zFnDqf')
    .then(function(data) {
    console.log('User playlists', data);
    this.setState({
      songs: data.tracks.items
    });
  }.bind(this), function(err) {
      console.error(err);
    });
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
        // const { songName, albumName, artistName, albumImg } = song;
        console.log(song);
        if(song.track) {
          var songName = song.track.name;
          var artistName = song.track.artists[0].name;
          var albumName = song.track.album.name;
          var albumImg = song.track.album.images[0].url
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
        }
    });
  }
}
