import React from 'react';
import { useDrag } from 'react-dnd';

const Node = ({ id, left, top, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NODE',
    item: { id, left, top },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left,
        top,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {children}
    </div>
  );
};

export default Node;
