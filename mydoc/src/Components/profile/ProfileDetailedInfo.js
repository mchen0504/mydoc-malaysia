import React, { Component } from 'react';

// sections: qualifications, languages, procedures, conditions
export class DetailedInfo extends Component {
    render() {
        return (
            <div className='detailed-info'>
                <Qualifications/>
                <hr className='profile-section-break' />
                <Languages/>
                <hr className='profile-section-break' />
                <Procedures/>
                <hr className='profile-section-break' />
                <Conditions/>
            </div>
        )
    }
}

export class Qualifications extends Component {
    render() {
        return (
            <section id='qualifications'>
                <h2><span>Qualifications</span></h2>
                <p className='content-text'>MMed (Mal), MB. BCh. BAO. (Hons) LRCPI & LRCSI (Ire), B. Biomed Sci. (Hons) (UM)</p>
            </section>
        )
    }
}

export class Languages extends Component {
    render() {
        return (
            <section id='Languages'>
                <h2><span>Languages</span></h2>
                <ul>
                    <li>English</li>
                    <li>Mandarin</li>
                    <li>Malay</li>
                    <li>Hokkien</li>
                    <li>Cantonese</li>
                </ul>
            </section>
        )
    }
}

export class Procedures extends Component {
    render() {
        return (
            <section id='procedures'>
                <h2><span>Procedures</span></h2>
                <ul>
                    <li>Colonoscopy</li>
                    <li>Gastroscopy</li>
                    <li>Endoscopic Retrograde Cholangiopancreatography (ERCP)</li>
                    <li>Fibroscan</li>
                    <li>Liver Biopsy</li>
                    <li>Endoscopic Ultrasound (EUS)</li>
                    <li>Small Bowel Enteroscopy</li>
                    <li>Capsule Endoscopy</li>
                </ul>
            </section>
        )
    }
}

export class Conditions extends Component {
    render() {
        return (
            <section id='conditions'>
                <h2><span>Conditions</span></h2>
                <ul>
                    <li>Helicobacter Pylori Infection</li>
                    <li>Dyspepsia</li>
                    <li>Gastro Esophageal Reflux Disease</li>
                    <li>Irritable Bowel Syndrome</li>
                    <li>Hepatitis B</li>
                    <li>Hepatitis C</li>
                    <li>Non-alcoholic Fatty Liver Disease</li>
                    <li>Hepatocellular Carcinoma</li>
                    <li>Inflammatory Bowel Disease</li>
                </ul>
            </section>
        )
    }
}
