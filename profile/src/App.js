import React, { Component } from 'react';
import './App.css';
import './profile.css';
import WebFont from 'webfontloader';

// local components
import { ReturnToSearch } from './Components/Return.js';
import { DoctorIdentity } from './Components/ProfileDoctorIdentity.js';
import { BasicInfoTags } from './Components/ProfileBasicInfoTags.js';
import { MakeAppointment } from './Components/ProfileMakeAppointment.js';
import { DetailedInfo } from './Components/ProfileDetailedInfo.js';
import { SpecialtyDoctors } from './Components/ProfileSpecialtyDoctors.js';
import { TopRatedSpecialties } from './Components/ProfileTopSpecialties.js';

WebFont.load({
  google: {
    families: ['Montserrat', 'Raleway', 'sans-serif']
    // ['Raleway', 'sans-serif']
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <body>
        <ReturnToSearch/>
        <div className='container'>
          <DoctorIdentity/>
          <hr/>
          <BasicInfoTags/>
        </div>
        <hr/>
        <MakeAppointment/>
        <hr/>
        <DetailedInfo/>
        <hr/>
        <SpecialtyDoctors/>
        <hr/>
        <TopRatedSpecialties/>
      </body>
    )
  }
}


export default App;
