import React, { useState, useEffect } from 'react';

const Visualization = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedParentNodes, setSelectedParentNodes] = useState([]);
  const [selectedChildNodes, setSelectedChildNodes] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [isBfsInProgress, setIsBfsInProgress] = useState(false);
  const [isDfsInProgress, setIsDfsInProgress] = useState(false);
  const [bfsStack, setBfsStack] = useState([]);
  const [dfsStack, setDfsStack] = useState([]);

  const handleNodeClick = (event) => {
    if (event.button === 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setNodes((prevNodes) => [
        ...prevNodes,
        { x, y, label: prevNodes.length.toString() },
      ]);
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
    setBfsStack([...selectedParentNodes]);

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
          setBfsStack((prevStack) => [...prevStack, node]);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsBfsInProgress(false);
  };

  const handleDfsStart = async () => {
    if (isDfsInProgress) return;
    setIsDfsInProgress(true);
    setVisitedNodes([]);
    setDfsStack([...selectedParentNodes]);

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
          setDfsStack((prevStack) => [...prevStack, node]);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
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
          const angle = Math.atan2(
            targetNode.y - sourceNode.y,
            targetNode.x - sourceNode.x
          );
          const distance = Math.sqrt(
            (targetNode.x - sourceNode.x) ** 2 +
            (targetNode.y - sourceNode.y) ** 2
          );

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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
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
            >
              {node.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBfsStart}
          disabled={isBfsInProgress}
        >
          Start BFS Visualization
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDfsStart}
          disabled={isDfsInProgress}
        >
          Start DFS Visualization
        </button>
      </div>
      <div className="mt-4">
        <strong>Visited Nodes:</strong>
        {visitedNodes.map((node, index) => (
          <span
            key={index}
            className="ml-2 bg-green-500 text-white font-bold px-2 py-1 rounded"
          >
            {node}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <strong>BFS Stack:</strong>
        {bfsStack.map((node, index) => (
          <span
            key={index}
            className="ml-2 bg-yellow-500 text-white font-bold px-2 py-1 rounded"
          >
            {node}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <strong>DFS Stack:</strong>
        {dfsStack.map((node, index) => (
          <span
            key={index}
            className="ml-2 bg-orange-500 text-white font-bold px-2 py-1 rounded"
          >
            {node}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Visualization;
