import React from 'react';


export default class PlaylistDrawer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <ul className="c-playList__nav">{ this.renderPlaylists() }</ul>
    );
  }

  renderPlaylists() {
    return this.props.userPlaylists.map((playList, idx) => {
      // Don't display the currently active playlist
      if(playList.id !== this.props.currentPlaylist.id) {
        let image = playList.images[0] ? playList.images[0].url : "";
        return (
          <li className="c-playList__nav-entry" key={ idx }>
            <a href="/" onClick={ this.props.switchPlaylists.bind(this, idx) }>
              <img src={ image } alt={ playList.name }/>
            </a>
          </li>
        );
      }
      else return null;

    });
  }
}
