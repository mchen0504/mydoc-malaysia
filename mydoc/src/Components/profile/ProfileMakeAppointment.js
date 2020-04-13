import React, { Component } from 'react';

// section: make appointment
export class MakeAppointment extends Component {
    render() {
        return (
            <section id='appointment'>
                <h2><span>Make Appointment</span></h2>
                <div id='booking'>
                    <div className='booking-icon-desc'>
                        <img className='booking-icons' src={require("../../img/profile/book-onsite.png")} alt="book onsite icon"/>
                        <p className='booking-desc'>On site</p>
                    </div>
                    <div className='booking-icon-desc'>
                        <img className='booking-icons' src={require("../../img/profile/book-phone.png")} alt="book through call icon"/>
                        <a className='booking-desc' href="tel:206-123-4567">(206)123-4567</a>
                    </div>
                    <div className='booking-icon-desc'>
                        <img className='booking-icons' src={require("../../img/profile/book-online.png")} alt="book online icon"/>
                        <a className='booking-desc' href="#">Online</a>
                    </div>
                    <div className='booking-icon-desc'>
                        <img className='booking-icons' src={require("../../img/profile/book-email.png")} alt="book through email icon"/>
                        <a className='booking-desc' href="mailto:mydoc@example.com">Email</a>
                    </div>
                </div>
            </section>
        )
    }
}