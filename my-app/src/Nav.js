import React, { Component }from 'react';
import './css/search-result.css';
import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Montserrat']
  }
});

export class Nav extends Component {
    handleClick = () => {
        this.props.callback(true)
    }

    render() {
        return (
            <section id='nav'>
                <div>
                    <a href="#" onClick={this.handleClick}><img className='small-search-icon' src='./img/magnifying.svg' alt='search-icon' /></a>
                </div>
            </section> 
        )
    }

}
