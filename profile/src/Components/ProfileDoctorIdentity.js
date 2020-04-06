import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export class DoctorIdentity extends Component {
    render() {
        return (
            <section id='doctor-identity'>
                <div id='pic-heart'>
                    <img className='doctor-pic' src="./img/doctor-profile-pic.png" alt="doctor profile picture"/>
                    <div className='likes-number'>
                        {/* <i className='fa fa-heart heart-icon'></i> */}
                         <FontAwesomeIcon icon={faHeart} className='heart-icon'/>

                        <span className='likes'>134,334</span>
                    </div>
                </div>
                <h1 id='doctor-name'>Dr. Alex Leow</h1>
                
                <div id='user-actions'>
                    <div className='icon-names'>
                        <img className='icons' src="./img/report-icon.png" alt="report icon"/>
                        <p>Report</p>
                    </div>
                    <div className='icon-names'>
                        <img className='icons' src="./img/share-icon.png" alt="share icon"/>
                        <p>Share</p>
                    </div>
                    <div className='icon-names'>
                        <img className='icons' src="./img/save-icon.png" alt="save icon"/>
                        <p>Save</p>
                    </div>
                </div>
            </section>
        )
    }
}