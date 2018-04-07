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
    return (
      <div className="site-wrapper">
        <Layout songs={this.state.songs}/>
      </div>
    );
  }
}
