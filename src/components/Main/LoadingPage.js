import React from 'react';
import {Spinner} from 'react-bootstrap';

export default function LoadingPage() {
    return (
        <div style={{textAlign:'center', marginTop:'200px'}}>
            <Spinner animation="border" variant="primary" />
        </div>
    )
}
