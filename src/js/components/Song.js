import React from 'react';

export default class Song extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      songDuration: 0
    };
  }

  componentWillReceiveProps(nextProps) {

  if (nextProps.isActive !== this.props.isActive) {
    this.setState({
      isActive: nextProps.isActive,
      songDuration: nextProps.track.duration_ms });
  }
}

  render() {
    let { track, songNum } = this.props;

    if(track) {
      let { name, artists, album, external_urls, uri } = track;

      let songName = name;
      let artistName = artists[0].name;
      let albumName = album.name;
      let albumImg = album.images[0] ? album.images[0].url : '';
      let playLink = uri;
      let classList = this.state.isActive ? 'c-song c-song--is-active' : 'c-song';

      return (

          <a onClick={ this.setActiveSong.bind(this, playLink) } className={ classList } href='#'>
            <img className="c-song__album-image" src={ albumImg } alt={ albumName }/>
            {/* { this.renderStatusIcon() } */}
            <div className="c-song__info">
              <h3 className="c-song__name">{ songName }</h3>
              <h5 className="c-song__artist">{ artistName }</h5>
              <h6 className="c-song__album">{ albumName }</h6>
            </div>
          </a>
      );
    }
  }

  renderStatusIcon() {
    if(this.state.isActive) {
      return (
        <svg className="c-song__status-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/>
        </svg>
      );
    }
    else {
      return (
        <svg className="c-song__status-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M3 22v-20l18 10-18 10z"/>
        </svg>
      );
    }
  }

  setActiveSong(playLink) {
    window.open(playLink);
    this.props.setActiveSong(this.props.songNum);
  }
}
