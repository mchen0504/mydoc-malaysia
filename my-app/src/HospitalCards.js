import React, { Component }from 'react';
import './css/search-result.css';

export class HospitalCards extends Component {
    render() {
        return (
            <section className="cards">
                <RenderOneHospital />
                <RenderOneHospital />
            </section>
        )
    }
}

class RenderOneHospital extends Component {
    render() {
        return (
            <div className='container'>
                <a href="#"><div className='card'>
                    <div className='card-horizontal'>
                        <div className='img-div'>
                            <img className='card-img hospital pl-4' src='./img/hospital.png' alt='Pantai hospital' />
                        </div>
                        <div className='card-body hospital col-sm'>
                            <div className='like-info'>
                                <img className='like-icon' src='./img/heart.svg' alt='like-icon' />
                                <p className='like-num'>120,110</p>
                            </div>
                            <h4 className="card-title hospital">Pantai Hospital Kuala Lumpur</h4>
                            <p className="card-text hospital">Hours: Open 24hrs</p>
                            <div>
                                <img className='call' src="./img/call.svg" alt="phone icon" />
                                <a className='tel' href="tel:+60 3-2296 0888">+60 3-2296 0888</a>
                            </div>
                            <div className='hospital-type-label-div hospital'>
                                <p className='hospital-label-text hospital'>Private</p>
                            </div>
                        </div>
                    </div>
                </div></a>
            </div>
        )
    }
}