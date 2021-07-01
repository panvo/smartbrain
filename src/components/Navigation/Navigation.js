import React from 'react'


const Navigation = ({ onRouteChange, isSignedIn }) => {

    return (
        <nav
            style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '7px' }}>

            <p
                className='f3 link dim black underline pa3 pointer'
                onClick={() => onRouteChange('signin')}>Sign out</p>
        </nav>
    );
}


export default Navigation;