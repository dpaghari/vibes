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
      currentPlaylistIdx: 0,
      isSwitching: false,
    };
  }

  componentWillMount() {
    let accessToken = getParameterByName('access_token');
    if(accessToken) {
      this.state.spotify = new SpotifyWebApi();
      this.state.spotify.setAccessToken(accessToken);
      this.state.spotify.getUserPlaylists('udbg4z88s6m3m2inrc64hs2ap')
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
      <section className="c-playlist container">
        <div className="c-playlist__wrapper">
          <div className="c-playlist__content container">
            <div className="c-playlist__info">
              <img className="c-playlist__img" src={playListImg} />
              <h1 className="c-playlist__info-headline">{name}</h1>
              {/* <p className="c-playlist__info-description">
                That was Wintermute, manipulating the lock the way it had manipulated the drone micro and the amplified breathing of the spherical chamber.
              </p> */}
            </div>
            
            <Songlist isSwitching={this.state.isSwitching} currentPlaylist={ this.state.currentPlaylist } />
          </div>
          <h3 className="c-playlist__subheadline">Past Mixtapes</h3>
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
      isSwitching: true,
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
