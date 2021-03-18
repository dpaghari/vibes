import { Transition } from 'react-transition-group';
import React from 'react';
import Song from './Song';


const defaultStyles= {
  transition: `opacity 300ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};


export default class Songlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSong: null,
      isSwitching: props.isSwitching || false,
    };
  }

  render() {
    return (
      <Transition in={this.state.isSwitching} timeout={1000}>
          {state => (
             <ul className="c-playlist__songlist">
             { this.renderSongs() }
           </ul>
          )}
        </Transition>
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
