
import React from 'react';
import './LoadingSpinner.scss';

/**
 * Component that display a spinner icon.
 * Adapted from https://loading.io/css/
 */ 
const LoadingSpinner = () => (
        <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
);

export default LoadingSpinner;
