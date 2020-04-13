import React, { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';

// section: display all doctors in the given specialty (eg: all Gastroenterologists)
export class SpecialtyDoctors extends Component {
    render() {
        return (
            <section>
                <SpecialtyAvgLikes/>
                <SpecialtyDoctorCards/>
            </section>
        )
    }
}

// average likes for the specialty
export class SpecialtyAvgLikes extends Component {
    render() {
        return (
            <div id='specialty-doctors'>
                <div>
                    <h2><span>All Gastroenterologists</span></h2>
                </div>
                <div id='average-likes'>
                    <div className='likes-number'>
                        <FavoriteIcon className='heart-icon'/>
                        <span className='likes'>9000</span>
                    </div>
                    <p>Average</p>
                </div>
            </div>
        )
    }
}

// 
export class SpecialtyDoctorCards extends Component {
    render() {
        return (
            <div id='arrow-card'>
            {/* left arrow */}
                <i className='fa fa-chevron-left'></i>

                {/* render only 1 card on phone view */}
                <div id='cards'>
                    {/* render a card for each doctor */}
                    <div className='card'>
                        <img className='doctor-pic' src={require("../../img/profile/doctor-profile-pic.png")} alt="doctor profile picture"/>
                        <div id='card-info'>
                            <h1 id='doctor-name'>Dr. Alex Leow</h1>
                            <p><span className='years'>7</span> years of practice</p>
                            <div className='likes-number'>
                                <i className='fa fa-heart heart-icon'></i>
                                <span className='likes'>134,334</span>
                            </div>
                        </div>
                    </div>

                    {/* render a card for each doctor */}
                    <div className='card'>
                        <img className='doctor-pic' src={require("../../img/profile/doctor-profile-pic.png")} alt="doctor profile picture"/>
                        <div id='card-info'>
                            <h1 id='doctor-name'>Dr. Alex Leow</h1>
                            <p><span className='years'>7</span> years of practice</p>
                            <div className='likes-number'>
                                <i className='fa fa-heart heart-icon'></i>
                                <span className='likes'>134,334</span>
                            </div>
                        </div>
                    </div>

                    {/* render a card for each doctor */}
                    <div className='card'>
                        <img className='doctor-pic' src={require("../../img/profile/doctor-profile-pic.png")} alt="doctor profile picture"/>
                        <div id='card-info'>
                            <h1 id='doctor-name'>Dr. Alex Leow</h1>
                            <p><span className='years'>7</span> years of practice</p>
                            <div className='likes-number'>
                                <i className='fa fa-heart heart-icon'></i>
                                <span className='likes'>134,334</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right arrow */}
                <i className='fa fa-chevron-right'></i>
            </div>
        )
    }
}

