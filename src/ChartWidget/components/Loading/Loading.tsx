import React from 'react';
import LoadingSpinner from '../Loading/LoadingSpinner';

const Loading = () => {
    return (
        <div className='layout-center' style={{ width: '500px', height: '500px' }}>
            <div>
                <LoadingSpinner></LoadingSpinner>
                <div>Loading</div>
            </div>
        </div>    
    )
}

export default Loading;


