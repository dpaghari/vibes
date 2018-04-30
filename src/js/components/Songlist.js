import React from 'react';
import Song from './Song';

export default class Songlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSong: null
    };
  }

  render() {
    return (
      <ul className="c-playlist__songlist">
        { this.renderSongs() }
      </ul>
    );
  }

  renderSongs() {
    const { tracks } = this.props.currentPlaylist;
    const { activeSong } = this.state;
    const songs = tracks ? tracks.items : [];

    if(songs) {
      return songs.map((song, idx) => {
        let isActive = idx === activeSong;
        return <Song key={idx} setActiveSong={this.setActiveSong.bind(this)} isActive={isActive} songNum={idx} {...song} />
      });
    }
  }

  setActiveSong(idx) {
    this.state.activeSong = idx;
    this.setState({ activeSong: this.state.activeSong });
  }
}
