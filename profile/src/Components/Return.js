import React, { Component } from 'react';
// import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";


export class ReturnToSearch extends Component {
    render() {
        return (
            <div id='return'>
            <FontAwesomeIcon icon={faChevronLeft} className="return-icon" size='1x' />
                {/* <i className="fa fa-chevron-left return-icon"></i> */}
                <p>Return to doctors</p>
            </div>
        )
    }
}