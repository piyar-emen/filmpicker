import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
    return (
        <div style={{ height: '100vh', backgroundColor: 'black' }} className='d-flex justify-content-center align-items-center flex-column'>
            <Spinner animation='border' className='loading-spinner' />
        </div>
    )
}

export default Loading