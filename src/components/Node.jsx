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
      className={`absolute left-${left} top-${top} ${isDragging ? 'opacity-50' : 'opacity-100'} cursor-move`}
    >
      {children}
    </div>
  );
};

export default Node;
