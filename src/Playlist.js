import SpotifyWebApi from 'spotify-web-api-js';
import spotifyHelper from './spotifyHelper';

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
      spotify: {},
      playlistName: 'Vibes',
      access_token: ''
    };

  }

  componentWillMount() {
    let at = this.getParameterByName('access_token');
    if(at) {
      var spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(at);
      spotifyApi.getUserPlaylists('dpaghari')
      .then(function(data) {
        console.log('User playlists', data);
      }, function(err) {
        console.error(err);
      });
      spotifyApi.getPlaylist('dpaghari', '6JMfX4X1l9yKOYa1zFnDqf')
      .then(function(data) {
        console.log(data);
      this.setState({
        songs: data.tracks.items,
        playlistName: data.name
      });
    }.bind(this), function(err) {
        console.error(err);
      });
    }
    else {
      this.loginToSpotify();
    }
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
    let playlistName = this.state.playlistName || 'Vibes';
    return (
      <div className="playList">
        <div className="playList__img-wrapper">
          <h1>{playlistName}</h1>
          <img className="playList__img" src="https://images.pexels.com/photos/387982/pexels-photo-387982.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"/>
        </div>
        <ul>
          { this.renderSongs() }
        </ul>
      </div>
    );
  }

  loginToSpotify() {
    spotifyHelper.login(function(accessToken) {
      console.log(accessToken);
      spotifyHelper.getUserData(accessToken)
                   .then(function(response) {

                      // loginButton.style.display = 'none';
                      // resultsPlaceholder.innerHTML = template(response);
                   });
    });
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
  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[#?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

    renderSongs() {
    let songs = this.state.songs;
    return songs.map((song, idx) => {
        if(song.track) {
          var songName = song.track.name;
          var artistName = song.track.artists[0].name;
          var albumName = song.track.album.name;
          var albumImg = song.track.album.images[0].url;
          var songPlayURL = song.track.external_urls.spotify;
          return (
            <li key={ idx }>
            <img src={albumImg} alt={albumImg}/>
            <div className="songInfo">
              <a href={songPlayURL}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/>
              </svg>
              </a>
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
