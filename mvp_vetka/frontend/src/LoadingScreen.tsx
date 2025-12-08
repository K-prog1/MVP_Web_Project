import React from 'react';
import './LoadingScreen'

const LoadingScreen: React.FC = () => {
    return (
        <body>
            <div className='loading-screen'>
                <div className = 'loading-logo'>
                    <div className='inner-square'> 
                        <svg className="trapezoid-shape"width="40%" height="40%" viewBox="0 0 400 200">

                        <path
                            d="M 20 20 Q 20 50, 400 0 L 300 200 L 100 200 Z"
                            fill="#ffbe45"
                            
                        />

                        <path
                        d="M 90 200 Q 200 230, 320 200" 
                        fill="none" 
                        stroke="#000000" 
                        stroke-width="30" 
                        stroke-linecap="round" 
                        />
                    </svg>
                        <div className='dollar-sign'><strong>$</strong></div>
                    </div>
                </div>
                <div className = 'loading-text'> <strong>VETKA</strong> </div>
            </div>
        </body>
    );
};

export default LoadingScreen;