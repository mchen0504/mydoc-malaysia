import React, { Component }from 'react';
import './css/search-result.css';

export class DoctorCards extends Component {
    render() {
        return (
            <section className='cards'>
                <RenderOneDoctor />
                <RenderOneDoctor />
            </section>
        )
    }
}

class RenderOneDoctor extends Component {
    render() {
        return (
            <div className='container'>
                <a href="#"><div className='card'>
                    <div className='card-horizontal'>
                        <div className='img-div'>
                            <img className='card-img pl-4' src='./img/Dr.Alex.png' alt='dr.alex picture' />
                        </div>
                        <div className='card-body col-sm'>
                            <div className='like-info'>
                                <img className='like-icon' src='./img/heart.svg' alt='like-icon' />
                                <p className='like-num'>120,110</p>
                            </div>
                            <h4 className="card-title">Dr. Alex Leow</h4>
                            <p className="card-text">Specialty: Gastroenterology</p>
                            <p className="card-text">Years of Practice: 7 years</p>
                            <p className="card-text">Language: English, Malay</p>
                            <div className='hospital-type-label-div'>
                                <p className='hospital-label-text'>Private</p>
                            </div>
                        </div>
                    </div>
                </div></a>
            </div>
        )
    }
}