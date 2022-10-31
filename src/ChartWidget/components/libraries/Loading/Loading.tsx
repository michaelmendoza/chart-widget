import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const Loading = () => (
        <div className='layout-center' style={{ width: '500px', height: '500px' }}>
            <div>
                <LoadingSpinner></LoadingSpinner>
                <div>Loading</div>
            </div>
        </div>    
    );

export default Loading;


