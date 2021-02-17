
import React from 'react';
import './LoadingSpinner.scss';

/**
 * Component that display a spinner icon 
 */
const LoadingSpinner = () => {
    return (
        <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default LoadingSpinner;
