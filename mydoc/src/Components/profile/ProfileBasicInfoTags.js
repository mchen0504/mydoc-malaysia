import React, { Component } from 'react';
import { EditTagsButton } from './ProfileEditTagsModal.js';
import Chip from '@material-ui/core/Chip';

// second section of profile page: specialty, years of practice, institution, phone number and location
export class BasicInfoTags extends Component {
    render() {
        return (
            <div id='info-tags'>
                <BasicInfo
                    recommendDoctor={this.props.recommendDoctor}
                    recommend={this.props.recommend}
                    liked={this.props.liked}
                    numLikes={this.props.numLikes}
                />
                <hr className='profile-section-break' />
                <ReviewTags />
            </div>
        )
    }
}

// first section: doctor picture, name, report, share and save button
export class BasicInfo extends Component {
    recommendDoctor = () => {
        this.props.recommendDoctor();
    }

    render() {
        let recommendClass;
        let numLikes = this.props.numLikes;
        if (!this.props.recommend) {
            recommendClass = 'fa-heart-o';
        } else {
            recommendClass = 'fa-heart';
            numLikes++;
        }

        return (
            <section id='basic-info'>
                {/* same information as first section (doctor identity) but 
                for the purpose of displaying on 1024 or bigger screen */}
                <div id='name-heart'>
                    <h1 id='doctor-name'>Dr. Alex Leow</h1>
                    <div className='likes-number'>
                        <i className={'fa ' + recommendClass + ' heart-icon'} onClick={this.recommendDoctor}></i>
                        {/* <FontAwesomeIcon icon={faHeart} className='heart-icon'/> */}
                        {/* <FavoriteBorderIcon className='heart-icon' /> */}

                        <span className='likes'>
                            {numLikes.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </span>
                    </div>
                </div>

                {/* start of second section */}
                <p className='content-text'><span className='basic-info-type'>Specialty:</span> <span className='specialty'>Gastroenterology</span></p>
                <p className='content-text'><span className='basic-info-type'>Years of Practice:</span> <span className='years'>7 </span>
                    years</p>
                <div id='institution-type'>
                    <p className='content-text'><span className='basic-info-type'>Institution:</span> <span className='specialty'>Pantai
                            Hospital Kuala Lumpur</span></p>
                    <div id='hospital-type'>
                        <p><span>Private</span></p>
                    </div>
                </div>
                <div className='icon-names'>
                    <img className='icons' src={require("../../img/profile/location-icon.png")} alt="location icon" />
                    <span className='content-text'>No. A103a - Endoscopy Centre, 1st Floor, Block A, 8, Jalan Bukit Pantai
                        59100
                        Kuala Lumpur</span>
                </div>
                <div className='icon-names'>
                    <img className='icons' src={require("../../img/profile/phone-icon.png")} alt="phone icon" />
                    <span className='content-text'>+603-2296 0763 Ext. 2763</span>
                </div>
            </section>
        )
    }
}

// render review tags for doctor
export class ReviewTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: [],
            seeAll: false
        };
    }
    
    addRemoveTag = (tag) => {
        let copy = [...this.state.selectedTags];
        let index = copy.indexOf(tag);
        // if the tag has been selected before
        if (index !== -1) {
            // let existingTag = {...copy[index]};
            // existingTag.count++;
            // copy[index] = existingTag;
            // this.setState({
            //     selectedTags: copy
            // })
            copy.splice(index, 1);
            this.setState({
                selectedTags: copy
            })
        } else {
            // cover cases for if the tag hasn't been selected and if no tags have been selected before
            this.setState(prevState => ({
                selectedTags: [
                    ...prevState.selectedTags, tag
                    // {label: tag, count: 1}
                ]
            }))
        }
    }

    displaySomeOrAllTags = () => {
        this.setState(prevState => ({
            seeAll: !prevState.seeAll
        }));
    }
    
    // display only 3 tags at first unless "see more" is clicked
    render() {
        let seeMoreLess = "See less"
        let toBeDisplayed = this.state.selectedTags;
        // change "see al" to "see less" and display only 3 tags
        if (!this.state.seeAll) {
            seeMoreLess = "See more"
            toBeDisplayed = toBeDisplayed.slice(0, 3);
        }
        let tags = toBeDisplayed.map((tag) => {
            // render each individual tag
            return <Chip
                        key={tag}
                        id='doctorTag'
                        size="small"
                        // label={tag.label + " (" + tag.count + ")"}
                        label={tag}
                        style={{
                            color: `white`,
                            backgroundColor: `rgb(255, 134, 134)`
                        }}
                    />;
        });

        return (
            <section id='review-tags'>
                <h2><span>Review Tags</span></h2>
                <div id='tags'>
                    {tags}
                    {/* edit tag button that includes edit tag modal */}
                    <EditTagsButton selectedTags={this.state.selectedTags} addRemoveTag={this.addRemoveTag} />
                </div>
                <span className='see-all' onClick={this.displaySomeOrAllTags}>{seeMoreLess}</span>
            </section>
        )
    }
}

