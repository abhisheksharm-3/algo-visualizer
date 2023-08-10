import React, { useState, useEffect } from 'react';

const Visualization = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedParentNodes, setSelectedParentNodes] = useState([]);
  const [selectedChildNodes, setSelectedChildNodes] = useState([]);
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
    if (!selectedParentNodes.includes(index)) {
      setSelectedParentNodes([index]);
    } else {
      if (selectedParentNodes[0] === index) {
        setSelectedParentNodes([]);
      }
    }
  };

  const handleChildNodeContextMenu = (event, index) => {
    event.preventDefault();
    if (selectedParentNodes.length > 0) {
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

      await new Promise((resolve) => setTimeout(resolve, 700));
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

      await new Promise((resolve) => setTimeout(resolve, 700));
    }

    setIsDfsInProgress(false);
  };

  return (
    <div className='w-screen flex flex-col items-center justify-center text-[#acacac]'>
      <div
      className='relative w-full h-[500px] border border-[#acacac]'
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
                left: sourceNode.x+11 + 'px',
                top: sourceNode.y+8 + 'px',
                width: distance + 'px',
                height: '1px',
                backgroundColor: '#acacac',
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
            className='text-center flex items-center justify-center text-white rounded-2xl'
            style={{
              position: 'absolute',
              left: node.x + 'px',
              top: node.y + 'px',
              width: '20px',
              height: '20px',
              backgroundColor: selectedParentNodes.includes(index)
                ? 'red'
                : visitedNodes.includes(index)
                ? '#49B618'
                : 'blue',
            }}
            onContextMenu={(event) => handleNodeContextMenu(event, index)}
          >
            <div
            className='text-center flex items-center justify-center'
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
      <div className="flex mt-32 lg:mt-4">
        <button
          className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBfsStart}
          disabled={isBfsInProgress}
        >
          BFS Visualization
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDfsStart}
          disabled={isDfsInProgress}
        >
          DFS Visualization
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
      <div className="mt-4 mb-16">
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
