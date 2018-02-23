import React from 'react';
import Song from './Song';

export default class Songlist extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <ul className="c-playList__songList">
        { this.renderSongs() }
      </ul>
    );
  }

  renderSongs() {
    let { tracks } = this.props.currentPlaylist;
    let songs = tracks ? tracks.items : [];
    if(songs) {
      return songs.map((song, idx) => <Song key={idx} track={song.track} />);
    }
  }
}
