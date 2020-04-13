import React, { Component } from 'react';


// !!this section is for hospital profile

// section: top rated specialties in this hospital
export class TopRatedSpecialties extends Component {
    render() {
        return (
            <section>
                <h2><span>Top Rated Specialities</span></h2>
                <ul>
                    <li>
                        <p className='specialty'>Neurology(<span className='specialty-likes'>>134,334</span>)</p>
                    </li>
                    <li>
                        <p className='specialty'>Neurology(<span className='specialty-likes'>>134,334</span>)</p>
                    </li>
                    <li>
                        <p className='specialty'>Neurology(<span className='specialty-likes'>>134,334</span>)</p>
                    </li>
                    <li>
                        <p className='specialty'>Neurology(<span className='specialty-likes'>>134,334</span>)</p>
                    </li>
                    <li>
                        <p className='specialty'>Neurology(<span className='specialty-likes'>>134,334</span>)</p>
                    </li>
                    <a href="#">See more</a>
                </ul>
            </section>
        )
    }
}