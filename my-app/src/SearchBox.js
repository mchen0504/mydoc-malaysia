import React, { Component }from 'react';
import * as serviceWorker from './serviceWorker';
import './css/search-result.css';

export class SearchBox extends Component {
    handleClick = () => {
        this.props.callback(false)
    }

    render() {
      return (
        <div>    
            {/* small screen */}
            <section id='search-box-layer'>
                <div id='search-box'>
                    <a href="#" onClick={this.handleClick}><img id='close-icon' src={'./img/close.svg'} alt='close icon' /></a>
                    <div align='center'>
                        <div id='search-options'>
                            <a id='specialty' href="#" className="tab" type="button">Specialty</a>
                            <a href="#" className="tab" type="button">Doctor</a>
                            <a href="#" className="tab" type="button">Hospital</a>
                            <a href="#" className="tab" type="button">Condition</a>
                        </div>
                        <div id='input-box' align='center'>
                            <div className='input-container'>
                                <input type="text" className='search-by-box' align='center' placeholder="Search by specialty"/>
                                <a href="#"><img className='input-dropdown' src='./img/dropdown.svg' alt='dropdown arrow' /></a>
                            </div>
                            <div className='input-container'>
                                <input type="text" className='search-by-box' align='center' placeholder="City, state, or post code"/>
                            </div>
                            <a href="#" id='search-button' type="button">Search</a>
                        </div>
                    </div>
                </div>
                <div id='shadow'></div>
            </section>

            {/* big screen */}
            <div id='ipad-shadow'></div>
            <section id='search-box-big-screen-div'>
                <div id='search-options'>
                    <a id='specialty' href="#" className="tab" type="button">Specialty</a>
                    <a href="#" className="tab" type="button">Doctor</a>
                    <a href="#" className="tab" type="button">Hospital</a>
                    <a href="#" className="tab" type="button">Condition</a>
                </div>
                <hr id='vertical-divider' />

                <div id='input-box' align='center'>
                    <div className='input-container'>
                        <input type="text" className='search-by-box' align='center' placeholder="Search by specialty"/>
                        <a href="#"><img className='input-dropdown' src='./img/dropdown.svg' alt='dropdown arrow' /></a>
                    </div>
                    <div className='input-container'>
                        <input type="text" className='search-by-box' align='center' placeholder="City, state, or post code"/>
                        <a href="#"><img className='input-dropdown' src='./img/dropdown.svg' alt='dropdown arrow' /></a>
                    </div>
                    <a href="#" id='search-button' type="button">Search</a>
                </div>
            </section>
        </div>
      )
    }
}
serviceWorker.unregister();



