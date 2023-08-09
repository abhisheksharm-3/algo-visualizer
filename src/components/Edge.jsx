import React from 'react';

const Edge = ({ startX, startY, endX, endY }) => {
  const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  return (
    <div
      style={{
        position: 'absolute',
        width: distance,
        height: 2,
        backgroundColor: '#333',
        transform: `translate(${startX}px, ${startY}px) rotate(${angle}deg)`,
        transformOrigin: '0 0',
      }}
    />
  );
};

export default Edge;
