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
      return (
        <li className="c-song">
          <a href={ playLink } target="_blank">
            <img src={ albumImg } alt={ albumImg }/>
            <div className="c-songInfo">
              <h3>{ songName }</h3>
              <h5>{ artistName }</h5>
              <h6>{ albumName }</h6>
            </div>
          </a>
        </li>
      );
    }
  }
}
