import React, { useState, useEffect } from 'react';

const AdvertisementBar = () => {
  const [currentSpan, setCurrentSpan] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentSpan(currentSpan === 1 ? 2 : 1);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentSpan]);

  return (
    <div className="advertisement-bar">
      {currentSpan === 1 && (
        <span>
          Get 10% off on all items! Use code: 
          <span className="animated-text">
            <b className="slanted-background">WTYD</b>
          </span>
        </span>
      )}
      {currentSpan === 2 && (
        <span>Free delivery across in Nairobi and its environs!</span>
      )}
    </div>
  );
};

export default AdvertisementBar;