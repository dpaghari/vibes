import React from 'react';

export default class Song extends React.Component {

  render() {
    if(this.props.track) {
      let { name, artists, album, external_urls } = this.props.track;
      let songName = name;
      let artistName = artists[0].name;
      let albumName = album.name;
      let albumImg = album.images[0] ? album.images[0].url : '';
      let playLink = external_urls.spotify;
      let playIcon = './play-icon.svg';
      return (
        <li className="c-song">
          <a href={ playLink } target="_blank">
            <img class="c-song__album-image" src={ albumImg } alt={ albumImg }/>
            <img class="c-song__play-icon" src={ playIcon } alt={ playIcon }/>
            <div className="c-song__info">
              <h3 className="c-song__name">{ songName }</h3>
              <h5 className="c-song__artist">{ artistName }</h5>
              <h6 className="c-song__album">{ albumName }</h6>
            </div>
          </a>
        </li>
      );
    }
  }
}
