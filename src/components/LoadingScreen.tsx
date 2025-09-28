import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-royal-blue to-blue-800 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            HIMAVAN
          </h1>
          <p className="text-powder-blue text-lg md:text-xl">Sustainable Living Solutions</p>
        </div>
        
        <div className="w-64 md:w-80 mx-auto">
          <div className="bg-white/20 rounded-full h-2 mb-4">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-white text-lg font-semibold">
            {Math.floor(Math.min(progress, 100))}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;