// LoadingSpinner.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ loading }) => {
    return (
        <div className="flex justify-center items-center" style={{ height: '100vh' }}>
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
        </div>
    );
};

export default LoadingSpinner;