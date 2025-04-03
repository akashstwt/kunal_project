import React from 'react';

const LoadingDots: React.FC = () => {
  return (
    <div className="typing-indicator">
      <span style={{ animationDelay: '0ms' }}></span>
      <span style={{ animationDelay: '300ms' }}></span>
      <span style={{ animationDelay: '600ms' }}></span>
    </div>
  );
};

export default LoadingDots;