import React, { Component } from 'react';

export class TopRatedSpecialties extends Component {
    render() {
        return (
            <section>
                <h2>Top Rated Specialities</h2>
                <div className='decoration'></div>
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