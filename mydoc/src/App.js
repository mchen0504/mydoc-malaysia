import React, { Component } from 'react';
import WebFont from 'webfontloader';


// local components
import { Profile } from './Components/profile/profile.js';

WebFont.load({
  google: {
    families: ['Montserrat', 'Raleway', 'sans-serif']
  }
});


class App extends Component {
  render() {
    return (
      <Profile />
    )
  }
}


export default App;