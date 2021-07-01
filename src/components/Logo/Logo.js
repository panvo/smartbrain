import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';


const Logo = () => {

    return (
        <nav className='ma4' style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px', marginTop: '1px' }}>
            <Tilt className="Tilt shadow-2 br-100" style={{ height: 75, width: 75 }}>
                <div className="Tilt-inner pa3 pointer"><img alt='logo' src={brain} /></div>
            </Tilt>
        </nav>
    );
}


export default Logo;
