import React, { useState } from 'react';
import Node from './Node';

const Tree = () => {
  const [nodes, setNodes] = useState([]);

  const handleDrop = (item, left, top) => {
    const newNode = { id: item.id, left, top };
    setNodes(prevNodes => [...prevNodes, newNode]);
  };

  return (
    <div style={{ position: 'relative', height: '500px', border: '1px solid #ccc' }}>
      {nodes.map(node => (
        <Node key={node.id} id={node.id} left={node.left} top={node.top}>
          Node {node.id}
        </Node>
      ))}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        Drop Nodes Here
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
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
