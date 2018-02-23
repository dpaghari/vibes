import SpotifyWebApi from 'spotify-web-api-js';
import spotifyHelper from './spotifyHelper';

import { getParameterByName } from './util';
import React from 'react';

import Songlist from './Songlist';
import PlaylistDrawer from './PlaylistDrawer';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spotify: {},
      access_token: '',
      userPlaylists: [],
      currentPlaylist: {}
    };

  }

  componentWillMount() {
    let accessToken = getParameterByName('access_token');
    if(accessToken) {
      this.state.spotify = new SpotifyWebApi();
      this.state.spotify.setAccessToken(accessToken);
      this.state.spotify.getUserPlaylists('dpaghari')
      .then(function(data) {
        this.state.userPlaylists = data.items;
        this.loadPlaylist(this.state.userPlaylists[0].id);
      }.bind(this),
      function(err) {
        console.error(err);
      });

    }
    else {
      this.loginToSpotify();
    }
  }

  componentDidMount() {}

  loadPlaylist(playListId) {
    this.state.spotify.getPlaylist('dpaghari', playListId)
    .then(function(data) {
    this.setState({currentPlaylist: data});
    }.bind(this), function(err) {
      console.error(err);
    });
  }

  render() {

    let { name, images } = this.state.currentPlaylist;
    let playListImg = images && images[0] ? images[0].url : "";
    return (
      <div className="c-playList">
        <div className="c-playList__wrapper">
          <div className="c-playList__img-wrapper">
            <h1>{name}</h1>
            <img className="c-playList__img" src={ playListImg } alt={name}/>
          </div>
          <Songlist currentPlaylist={ this.state.currentPlaylist }/>
        </div>
        <PlaylistDrawer currentPlaylist={ this.state.currentPlaylist }
                        userPlaylists={ this.state.userPlaylists }
                        switchPlaylists={ this.switchPlaylists.bind(this) } />
      </div>
    );
  }

  switchPlaylists(idx, e) {
    e.preventDefault();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.loadPlaylist(this.state.userPlaylists[idx].id);
  }

  loginToSpotify() {
    spotifyHelper.login(function(accessToken) {
      spotifyHelper.getUserData(accessToken).then(function(response) {});
    });
  }


}
