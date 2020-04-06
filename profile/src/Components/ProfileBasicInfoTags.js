import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class BasicInfoTags extends Component {
    render() {
        return (
            <div id='info-tags'>
                <BasicInfo/>
                <hr/>
                <ReviewTags/>
            </div>
        )
    }
}

export class BasicInfo extends Component {
    render() {
        return (
            <section id='basic-info'>
                {/* only show up on ipad or bigger screen */}
                <div id='name-heart'>
                    <h1 id='doctor-name'>Dr. Alex Leow</h1>
                    <div className='likes-number'>
                        {/* <i className='fa fa-heart heart-icon'></i> */}
                        <FontAwesomeIcon icon={faHeart} className='heart-icon'/>

                        <span className='likes'>134,334</span>
                    </div>
                </div>
                <p className='content-text'><span className='basic-info-type'>Specialty:</span> <span className='specialty'>Gastroenterology</span></p>
                <p className='content-text'><span className='basic-info-type'>Years of Practice:</span> <span className='years'>7 </span>
                    years</p>
                <div id="institution-type">
                    <p className='content-text'><span className='basic-info-type'>Institution:</span> <span className='specialty'>Pantai
                            Hospital Kuala Lumpur</span></p>
                    <div className='tag'>
                        <p>Private</p>
                    </div>
                </div>
                <div className='icon-names'>
                    <img className='icons' src="./img/location-icon.png" alt="location icon"/>
                    <span className='content-text'>No. A103a - Endoscopy Centre, 1st Floor, Block A, 8, Jalan Bukit Pantai
                        59100
                        Kuala Lumpur</span>
                </div>
                <div className='icon-names'>
                    <img className='icons' src="./img/phone-icon.png" alt="phone icon"/>
                    <span className='content-text'>+603-2296 0763 Ext. 2763</span>
                </div>
            </section>
        )
    }
}

export class ReviewTags extends Component {
    render() {
        return (
            <section id='review-tags'>
                <h2>Review Tags</h2>
                <div className='decoration'></div>
                <div id='tags'>
                    <div className='tag'>
                        <p>Bedside Manner (<span className='tag-count'>1</span>)</p>
                    </div>
                    <div className='tag'>
                        <p>Friendly (<span className='tag-count'>8</span>)</p>
                    </div>
                    <div id='plus-icon'>
                        <input type="image" src="./img/plus-icon.png"/>
                    </div>
                </div>
                <a href="#">See more</a>
            </section>
        )
    }
}

