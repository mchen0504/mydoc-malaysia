import React, { Component } from 'react';

// profile components
import { ReturnToSearch } from './Return';
import { DoctorIdentity } from './ProfileDoctorIdentity.js';
import { BasicInfoTags } from './ProfileBasicInfoTags.js';
import { MakeAppointment } from './ProfileMakeAppointment';
import { DetailedInfo } from './ProfileDetailedInfo.js';
import { SpecialtyDoctors } from './ProfileSpecialtyDoctors.js';
import { TopRatedSpecialties } from './ProfileTopSpecialties.js';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommend: false,
      liked: false,
      numLikes: 134334
    };
  }

  recommendDoctor = () => {
    this.setState(prevState => ({
      recommend: !prevState.recommend,
      liked: true
    }));
  }

  render() {
    return (
      <div>
        <ReturnToSearch />
        <div className='container'>
          <DoctorIdentity
            recommendDoctor={this.recommendDoctor}
            recommend={this.state.recommend}
            liked={this.state.liked}
            numLikes={this.state.numLikes}
          />
          <hr className='profile-section-break' />
          <BasicInfoTags
            recommendDoctor={this.recommendDoctor}
            recommend={this.state.recommend}
            liked={this.state.liked}
            numLikes={this.state.numLikes}
          />
        </div>
        <hr className='profile-section-break' />
        <MakeAppointment />
        <hr className='profile-section-break' />
        <DetailedInfo />
        <hr className='profile-section-break' />
        <SpecialtyDoctors />
        <hr className='profile-section-break' />
        <TopRatedSpecialties />
      </div>
    )
  }
}
