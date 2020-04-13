import React, { Component } from 'react';


// first section of profile page: doctor picture, name, (report, share and save)
export class DoctorIdentity extends Component {
    recommendDoctor = () => {
        this.props.recommendDoctor();
    }

    render() {
        let recommendClass;
        let numLikes = this.props.numLikes;
        // if recommend: filled heart; if not recommend: outline heart
        if (!this.props.recommend) {
            recommendClass = 'fa-heart-o';
        } else {
            recommendClass = 'fa-heart';
            numLikes++;
        }

        return (
            <section id='doctor-identity'>
                <div id='pic-heart'>
                    <img className='doctor-pic' src={require("../../img/profile/doctor-profile-pic.png")} alt="doctor profile picture"/>
                    <div className='likes-number'>
                        <i className={'fa ' + recommendClass + ' heart-icon'} onClick={this.recommendDoctor}></i>
                        <span className='likes'>
                        {/* display like number with comma */}
                            {numLikes.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </span>
                    </div>
                </div>
                <h1 id='doctor-name'>Dr. Alex Leow</h1>
                
                <div id='user-actions'>
                    <div className='icon-names'>
                        <img className='icons' src={require("../../img/profile/report-icon.png")} alt="report icon"/>
                        <p>Report</p>
                    </div>
                    <div className='icon-names'>
                        <img className='icons' src={require("../../img/profile/share-icon.png")} alt="share icon"/>
                        <p>Share</p>
                    </div>
                    <div className='icon-names'>
                        <img className='icons' src={require("../../img/profile/save-icon.png")} alt="save icon"/>
                        <p>Save</p>
                    </div>
                </div>
            </section>
        )
    }
}