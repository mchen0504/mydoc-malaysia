import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import { Nav } from './Nav.js';
import { SearchBox } from './SearchBox.js';
import { Header } from './Header.js';
import { HospitalCards } from './HospitalCards.js'
import { DoctorCards } from './DoctorCards.js';
import './css/search-result.css';
import withSizes from 'react-sizes';
import WebFont from 'webfontloader';
WebFont.load({
  google: {
    families: ['Montserrat']
  }
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            smallFilter: false,
            smallDisplayBy: false
        };
    }

    searchOnClick = (yesSearch) => {
        this.setState(() => {
            let stateChanges = {search: yesSearch};
            return stateChanges;
        })
    }

    smallFilterOnClick = (yesFilter) => {
        this.setState(() => {
            let stateChanges = {smallFilter: yesFilter};
            return stateChanges;
        })
    }

    smallDisplayByOnClick = (yesDisplayBy) => {
        this.setState(() => {
            let stateChanges = {smallDisplayBy: yesDisplayBy};
            return stateChanges;
        })
    }

    render() {
        return (
            <div>
                <Nav callback={this.searchOnClick} />
                { this.state.search ? <SearchBox callback={this.searchOnClick} /> : null }
                <Header filterCallback={this.smallFilterOnClick} displayByCallback={this.smallDisplayByOnClick} />
                { this.state.smallFilter ? <SmallFilters filterCallback={this.smallFilterOnClick} /> : null }
                { this.state.smallDisplayBy ? <SmallDisplay displayByCallback={this.smallDisplayByOnClick} /> : null }
                <BigFilters />
                {/* <HospitalCards /> */}
                <DoctorCards />
            </div>
        )
    }
}

class SmallFilters extends Component {
    filterHandleClick = () => {
        this.props.filterCallback(false)
    }

    render() {
        return (
            <section id='separate-layer'>
                <div className='sep-layer-left' onClick={this.filterHandleClick}></div>
                <div className='sep-layer-right'>
                    <h5>Filters</h5>
                    <hr />
                    <div id='filter-separate-layer'>
                        <div id='filter-types-ipad'>
                            <div className='one-filter-ipad'>
                                <p className='type-name-ipad'>Hospital Type</p>
                                <div className='options-ipad'>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" checked="checked" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>Both</span>
                                    </label>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>Public</span>
                                    </label>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>Private</span>
                                    </label>
                                </div>
                            </div>

                            <div className='one-filter-ipad' align='left'>
                                <p className='type-name-ipad'>Languages</p>
                                <div className='options-ipad'>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" checked="checked" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>English</span>
                                    </label>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>Malay</span>
                                    </label>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>Mandarin</span>
                                    </label>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>Tamil</span>
                                    </label>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>Cantonese</span>
                                    </label>
                                </div>
                            </div>

                            <div className='one-filter-ipad' align='left'>
                                <p className='type-name-ipad'>Years of Practice</p>
                                <div className='options-ipad'>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" checked="checked" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>&lt; 1 year</span>
                                    </label>
                                    <div align='left'>
                                        <label className='checkbox' align='left'>
                                            <input type='checkbox' name="scales" />
                                            <span className="checkmark"></span>
                                            <span className='checkbox-text'>1 - 5 years</span>
                                        </label>
                                        <label className='checkbox' align='left'>
                                            <input type='checkbox' name="scales" />
                                            <span className="checkmark"></span>
                                            <span className='checkbox-text'>6 - 10 years</span>
                                        </label>
                                        <label className='checkbox' align='left'>
                                            <input type='checkbox' name="scales" />
                                            <span className="checkmark"></span>
                                            <span className='checkbox-text'>11 - 20 years</span>
                                        </label>
                                        <label className='checkbox' align='left'>
                                            <input type='checkbox' name="scales" />
                                            <span className="checkmark"></span>
                                            <span className='checkbox-text'>> 20 years</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                        
                    <div className='done'>
                        <a href="#" className='done-button' type="button" onClick={this.filterHandleClick}>Done</a>
                    </div>
                </div>
            </section>
        )
    }
}

// const mapSizesToProps = ({ width }) => ({
//     display: width < 1024 ? <SmallFilters callback={this.smallFilterOnClick} filterCallback={this.smallFilterOnClick} /> : null
//   })

// export default withSizes(mapSizesToProps)(SmallFilters)

class SmallDisplay extends Component {
    displayByHandleClick = () => {
        this.props.displayByCallback(false)
    }

    render() {
        return (
            <section className="separate-layer">
                <div className="sep-layer-left" onClick={this.displayByHandleClick}></div>
                <div className="sep-layer-right">
                    <h5>Filters</h5>
                    <hr />
                    <div id='filter-separate-layer'>
                        <div id='filter-types-ipad'>
                            <div className='options-ipad display'>
                                <div className='one-filter-ipad'>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" checked="checked" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>Doctor</span>
                                    </label>
                                    <label className='checkbox' align='left'>
                                        <input type='checkbox' name="scales" />
                                        <span className="checkmark"></span>
                                        <span className='checkbox-text'>Hospital</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class BigFilters extends Component {
    render() {
        return (
            <section id='filters-ipad'>
                <div id='filter-types'>
                    <div className='one-filter-ipad'>
                        <p className='type-name-ipad'>Hospital Type</p>
                        <div className='options-ipad'>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" checked="checked" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>Both</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>Public</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>Private</span>
                            </label>
                        </div>
                    </div>

                    <div className='one-filter-ipad' align='left'>
                        <p className='type-name-ipad'>Languages</p>
                        <div className='options-ipad'>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" checked="checked" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>English</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>Malay</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>Mandarin</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>Tamil</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>Cantonese</span>
                            </label>
                        </div>
                    </div>

                    <div className='one-filter-ipad' align='left'>
                        <p className='type-name-ipad'>Years of Practice</p>
                        <div className='options-ipad'>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" checked="checked" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>&lt; 1 year</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>1 - 5 years</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>6 - 10 years</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>11 - 20 years</span>
                            </label>
                            <label className='checkbox' align='left'>
                                <input type='checkbox' name="scales" />
                                <span className="checkmark"></span>
                                <span className='checkbox-text'>> 20 years</span>
                            </label>
                        </div>
                    </div>     
                </div> 
                <div className='done'>
                    <a href="#" className='done-button' type="button">Done</a>
                </div>         
            </section>
        ) 
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));