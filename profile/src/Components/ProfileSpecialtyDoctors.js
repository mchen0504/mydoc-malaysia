import React, { Component } from 'react';


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

export class SpecialtyAvgLikes extends Component {
    render() {
        return (
            <div id='specialty-doctors'>
                <div>
                    <h2>All Gastroenterologists</h2>
                    <div className='decoration'></div>
                </div>
                <div id='average-likes'>
                    <div className='likes-number'>
                        <i className='fa fa-heart heart-icon'></i>
                        <span className='likes'>9000</span>
                    </div>
                    <p>Average</p>
                </div>
            </div>
        )
    }
}

export class SpecialtyDoctorCards extends Component {
    render() {
        return (
            <div id='arrow-card'>
                <i className='fa fa-chevron-left'></i>
                <div id='cards'>
                    <div className='card'>
                        <img className='doctor-pic' src="./img/doctor-profile-pic.png" alt="doctor profile picture"/>
                        <div id='card-info'>
                            <h1 id='doctor-name'>Dr. Alex Leow</h1>
                            <p><span className='years'>7</span> years of practice</p>
                            <div className='likes-number'>
                                <i className='fa fa-heart heart-icon'></i>
                                <span className='likes'>134,334</span>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <img className='doctor-pic' src="./img/doctor-profile-pic.png" alt="doctor profile picture"/>
                        <div id='card-info'>
                            <h1 id='doctor-name'>Dr. Alex Leow</h1>
                            <p><span className='years'>7</span> years of practice</p>
                            <div className='likes-number'>
                                <i className='fa fa-heart heart-icon'></i>
                                <span className='likes'>134,334</span>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <img className='doctor-pic' src="./img/doctor-profile-pic.png" alt="doctor profile picture"/>
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
                <i className='fa fa-chevron-right'></i>
            </div>
        )
    }
}

