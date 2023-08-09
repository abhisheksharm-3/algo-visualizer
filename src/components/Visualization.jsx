import React, { useState } from 'react';

const Visualization = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedParentNodes, setSelectedParentNodes] = useState([]);
  const [selectedChildNodes, setSelectedChildNodes] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [isBfsInProgress, setIsBfsInProgress] = useState(false);
  const [isDfsInProgress, setIsDfsInProgress] = useState(false);

  const handleNodeClick = (event) => {
    if (event.button === 0) {
      // Left click to add a node
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setNodes((prevNodes) => [...prevNodes, { x, y }]);
    }
  };

  const handleNodeContextMenu = (event, index) => {
    event.preventDefault();
    setSelectedChildNodes([]);
    if (!selectedParentNodes.includes(index)) {
      setSelectedParentNodes([index]);
      setClickCount((prevCount) => prevCount + 1);
    } else {
      if (clickCount === 1 && selectedParentNodes[0] === index) {
        setSelectedParentNodes([]);
        setClickCount(0);
      }
    }
  };

  const handleChildNodeContextMenu = (event, index) => {
    event.preventDefault();
    if (selectedParentNodes.length > 0 && !selectedChildNodes.includes(index)) {
      setSelectedChildNodes([index]);
      const newEdges = selectedParentNodes.map((parentNode) => ({
        source: parentNode,
        target: index,
      }));
      setEdges((prevEdges) => [...prevEdges, ...newEdges]);
    }
  };

  const handleBfsStart = async () => {
    if (isBfsInProgress) return;
    setIsBfsInProgress(true);
    setVisitedNodes([]);

    const bfsQueue = [...selectedParentNodes];
    const visited = new Set();

    while (bfsQueue.length > 0) {
      const currentNode = bfsQueue.shift();
      setVisitedNodes((prevVisited) => [...prevVisited, currentNode]);
      visited.add(currentNode);

      const adjacentNodes = edges
        .filter((edge) => edge.source === currentNode)
        .map((edge) => edge.target);

      for (const node of adjacentNodes) {
        if (!visited.has(node) && !bfsQueue.includes(node)) {
          bfsQueue.push(node);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500)); // Add delay for visualization
    }

    setIsBfsInProgress(false);
  };

  const handleDfsStart = async () => {
    if (isDfsInProgress) return;
    setIsDfsInProgress(true);
    setVisitedNodes([]);

    const dfsStack = [...selectedParentNodes];
    const visited = new Set();

    while (dfsStack.length > 0) {
      const currentNode = dfsStack.pop();
      setVisitedNodes((prevVisited) => [...prevVisited, currentNode]);
      visited.add(currentNode);

      const adjacentNodes = edges
        .filter((edge) => edge.source === currentNode)
        .map((edge) => edge.target);

      for (const node of adjacentNodes) {
        if (!visited.has(node) && !dfsStack.includes(node)) {
          dfsStack.push(node);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500)); // Add delay for visualization
    }

    setIsDfsInProgress(false);
  };

  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          border: '1px solid #ccc',
        }}
        onClick={handleNodeClick}
        onContextMenu={(e) => e.preventDefault()}
      >
        {edges.map((edge, index) => {
          const sourceNode = nodes[edge.source];
          const targetNode = nodes[edge.target];
          const angle = Math.atan2(targetNode.y - sourceNode.y, targetNode.x - sourceNode.x);
          const distance = Math.sqrt((targetNode.x - sourceNode.x) ** 2 + (targetNode.y - sourceNode.y) ** 2);

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: sourceNode.x + 'px',
                top: sourceNode.y + 'px',
                width: distance + 'px',
                height: '1px',
                backgroundColor: 'black',
                transform: `rotate(${angle}rad)`,
                transformOrigin: '0 0',
              }}
            />
          );
        })}
        {nodes.map((node, index) => (
          <div
            key={index}
            data-node-index={index}
            style={{
              position: 'absolute',
              left: node.x + 'px',
              top: node.y + 'px',
              width: '20px',
              height: '20px',
              backgroundColor: selectedParentNodes.includes(index)
                ? 'red'
                : visitedNodes.includes(index)
                ? 'green'
                : 'blue',
              borderRadius: '50%',
            }}
            onContextMenu={(event) => handleNodeContextMenu(event, index)}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                cursor: 'context-menu',
              }}
              onContextMenu={(event) => handleChildNodeContextMenu(event, index)}
            />
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleBfsStart} disabled={isBfsInProgress}>
          Start BFS Visualization
        </button>
        <button onClick={handleDfsStart} disabled={isDfsInProgress}>
          Start DFS Visualization
        </button>
      </div>
      <div>
        <strong>Visited Nodes:</strong>
        {visitedNodes.map((node, index) => (
          <span key={index} style={{ margin: '0 5px' }}>
            {node}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Visualization;