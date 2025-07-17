import React, { useState, useEffect } from 'react';

function Success({data ,actions}) {
  console.log(data)
  console.log(actions);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
   
    setIsVisible(true);
  }, []);

  const successStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '30px', // Increased padding for better spacing
    borderRadius: '10px', // Increased border radius for smoother corners
    margin: '20px auto',
    width: 'fit-content',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
    fontSize: '24px', // Increased font size for better readability
  };

  return (
    <div style={successStyle}>
      <i className="fas fa-check-circle" style={{marginRight: '10px', fontSize: '30px'}}></i> {/* Increased icon size */}
      Your Payment Has Been Successful
      <style>{`
        @keyframes rotateIcon {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Success;
