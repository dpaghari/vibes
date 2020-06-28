import '../sass/styles.css';
// Custom Components
import Layout from './Layout';

import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  

  render() {
    const headline = "moodiboi";
    return (
      <div className="site-wrapper">
        <nav className="c-nav">
          <h1 className="c-nav__headline">{headline}</h1>
        </nav>
        <Layout songs={this.state.songs}/>
      </div>
    );
  }
}
