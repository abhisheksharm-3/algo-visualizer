import React, { useState } from 'react';
import Node from './Node';

const Tree = () => {
  const [nodes, setNodes] = useState([]);

  const handleDrop = (item, left, top) => {
    const newNode = { id: item.id, left, top };
    setNodes(prevNodes => [...prevNodes, newNode]);
  };

  return (
    <div className="relative h-[500px] border border-gray-300">
      {nodes.map(node => (
        <Node key={node.id} id={node.id} left={node.left} top={node.top}>
          Node {node.id}
        </Node>
      ))}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Drop Nodes Here
      </div>
      <div
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        onDrop={e => {
          e.preventDefault();
          const item = JSON.parse(e.dataTransfer.getData('text/plain'));
          const left = e.clientX - e.target.getBoundingClientRect().left;
          const top = e.clientY - e.target.getBoundingClientRect().top;
          handleDrop(item, left, top);
        }}
        onDragOver={e => e.preventDefault()}
      />
    </div>
  );
};

export default Tree;
