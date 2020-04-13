import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// return to doctors search results
export class ReturnToSearch extends Component {
    render() {
        return (
            <div id='return'>
                <FontAwesomeIcon icon={faChevronLeft} className="return-icon" size='1x' />
                <p>Return to doctors</p>
            </div>
        )
    }
}