import React, { Component }from 'react';
import './css/search-result.css';

export class Header extends Component {
    filterHandleClick = () => {
        this.props.filterCallback(true)
    }

    displayByHandleClick = () => {
        this.props.displayByCallback(true)
    }

    render() {
        return (
            <div>
                {/* small screen */}
                <section id='filters'>
                    <div id='filter'>
                        <a href='#' className='btn' role='button' onClick={this.filterHandleClick}>
                            <p className='filter-text'>Filter
                                <img className='dropdown-arrow' src='./img/dropdown.svg' alt='dropdown arrow' />
                            </p>
                        </a>
                    </div>
                    <div id='display-by'>
                        <a href='#' className='btn' role='button' onClick={this.displayByHandleClick}>
                            <p className='display-text'>Display by Doctor
                                <img className='dropdown-arrow' src='./img/dropdown.svg' alt='dropdown arrow' />
                            </p>
                        </a>
                    </div>
                </section>  

                {/* big screen */}
                <section id='display-by-ipad'>
                    <div id='head-switch-button'>
                        <p id='display-result-header'>Display results by doctors</p>
                        <div id='display-buttons'>
                            <a href="#" className='display-button1' type='button'>Doctor</a>
                            <a href="#" className='display-button2' type='button'>Hospital</a>
                        </div>
                    </div>
                </section>         
            </div>
        )
    }
}