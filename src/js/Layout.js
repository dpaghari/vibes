import SpotifyWebApi from 'spotify-web-api-js';
import spotifyHelper from './spotifyHelper';

import { getParameterByName } from './util';
import React from 'react';

import Songlist from './components/Songlist';
import PlaylistDrawer from './components/PlaylistDrawer';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spotify: {},
      access_token: '',
      userPlaylists: [],
      currentPlaylist: {},
      currentPlaylistIdx: 0
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

  render() {
    let { currentPlaylist,  currentPlaylistIdx } = this.state;
    let { name, images } = currentPlaylist;
    let spotifyAlbumImg = images && images[0] ? images[0].url : "";
    let playListImg = spotifyAlbumImg;
    return (
      <section className="c-playlist">
        <div className="c-playlist__wrapper">
          <header className="c-playlist__header">
            <h1>Yousic</h1>
          </header>
          <div className="c-playlist__content">
            <div className="c-playlist__img-wrapper" style={{'backgroundImage' : `url(${playListImg})`}}>
              <h1>{name}</h1>
            </div>
            <Songlist currentPlaylist={ this.state.currentPlaylist } />
          </div>
          <PlaylistDrawer currentPlaylist={ this.state.currentPlaylist }
                          userPlaylists={ this.state.userPlaylists }
                          switchPlaylists={ this.switchPlaylists.bind(this) }
                          toggleCollapseContent={ this.toggleCollapseContent.bind(this) }/>
        </div>
      </section>
    );
  }

  toggleCollapseContent() {
    this.setState({ collapseContent : !this.state.collapseContent });
  }

  loadPlaylist(playListId, idx) {
    this.state.spotify.getPlaylist('dpaghari', playListId)
    .then(function(data) {
    this.setState({
      currentPlaylist: data,
      currentPlaylistIdx: idx
    });
    }.bind(this), function(err) {
      console.error(err);
    });
  }

  switchPlaylists(idx, e) {
    e.preventDefault();
    document.body.scrollTop = 0;
    this.loadPlaylist(this.state.userPlaylists[idx].id, idx);
  }

  loginToSpotify() {
    spotifyHelper.login(function(accessToken) {
      spotifyHelper.getUserData(accessToken).then(function(response) {});
    });
  }

}
