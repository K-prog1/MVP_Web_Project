import React from 'react';
import './LoadingScreen.css'

const LoadingScreen: React.FC = () => {
    return (
        <div className="loading-screen">
            <div className='loading-spinner'>
                <p className='loading-text'>Загрузка анкеты...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;