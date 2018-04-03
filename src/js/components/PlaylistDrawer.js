import React from 'react';


export default class PlaylistDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // collapsed: true
    };
  }

  render() {
    return (
      <ul className="c-playList__drawer">
        { this.renderPlaylists() }
      </ul>
    );
  }

  // toggleCollapse() {
  //   this.props.toggleCollapseContent();
  //   this.setState({collapsed: !this.state.collapsed});
  // }

  renderPlaylists() {
    let { userPlaylists, currentPlaylist, switchPlaylists } = this.props;
    return userPlaylists.map((playlist, idx) => {
      // Don't display the currently active playlist
      if(playlist.id !== currentPlaylist.id) {
        let image = playlist.images[0] ? playlist.images[0].url : "";
        return (
          <li className="c-playList__drawer-entry" key={ idx }>
            <a href="/" onClick={ switchPlaylists.bind(this, idx) }>
              <img src={ image } alt={ playlist.name } />
            </a>
          </li>
        );
      }
      else
        return null;
    });
  }
}
