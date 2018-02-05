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
      addingSong: false,
      spotify: {},
      access_token: '',
      userPlaylists: [],
      currentPlaylist: {}
    };

  }

  componentWillMount() {
    let accessToken = this.getParameterByName('access_token');
    if(accessToken) {

      this.state.spotify = new SpotifyWebApi();
      this.state.spotify.setAccessToken(accessToken);
      this.state.spotify.getUserPlaylists('dpaghari')
      .then(function(data) {
        this.state.userPlaylists = data.items;
        this.loadPlaylist(this.state.userPlaylists[3].id);
      }.bind(this),
      function(err) {
        console.error(err);
      });

    }
    else {
      this.loginToSpotify();
    }
  }

  componentDidMount() {
    // console.log(this.state);
  }

  loadPlaylist(playListId) {
    this.state.spotify.getPlaylist('dpaghari', playListId)
    .then(function(data) {

    this.setState({
      currentPlaylist: data
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

    let { name, images } = this.state.currentPlaylist;
    let playListImg = images && images[0] ? images[0].url : "";

    return (
      <div className="playList">
        <ul className="playList__nav">{ this.renderPlaylists() }</ul>
        <div className="playList__wrapper">
          <div className="playList__img-wrapper">
            <h1>{name}</h1>
            <img className="playList__img" src={playListImg}/>
          </div>
          <ul>
            { this.renderSongs() }
          </ul>
        </div>
      </div>
    );
  }

  renderPlaylists() {
    return this.state.userPlaylists.map((playList, idx) => {
      let image = playList.images[0] ? playList.images[0].url : "";
      return (
        <li className="c-playListNav__entry" key={idx}>
          <a href="#" onClick={ this.switchPlaylists.bind(this, idx) }>
            <span>{playList.name}</span>
            <img src={image} alt={playList.name}/>
          </a>
        </li>
      );
    });
  }

  switchPlaylists(idx, e) {
    e.preventDefault();
    this.loadPlaylist(this.state.userPlaylists[idx].id);
  }

  loginToSpotify() {
    spotifyHelper.login(function(accessToken) {
      spotifyHelper.getUserData(accessToken).then(function(response) {});
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
      // console.log(this.state.currentPlaylist);
    let { tracks } = this.state.currentPlaylist;
    console.log(this.state);

    let songs = tracks ? tracks.items : [];

    if(songs) {
      return songs.map((song, idx) => {
          if(song) {
            let { name, artists, album } = song.track;
            var songName = name;
            var artistName = artists[0].name;
            var albumName = album.name;
            var albumImg = album.images[0] ? album.images[0].url : '';
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
}
