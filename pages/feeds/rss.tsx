import { Component } from 'react';
import { fetchFeed } from '../../utils';

class RssFeed extends Component {
  static async getInitialProps({ res }) {
    const text = await fetchFeed();
    res.setHeader('Content-Type', 'application/xml')
    res.end(text);
  }

  render() {
      return null;
  }
}

export default RssFeed;