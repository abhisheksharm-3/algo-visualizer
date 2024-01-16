import { useState } from "react";
import { bfsAlgorithm, dfsAlgorithm } from "./graphAlgorithms";
import Graph from "./Graph";

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

  const handleBfsStart = async () => {
    if (isBfsInProgress) return;
    setIsBfsInProgress(true);
    setVisitedNodes([]);
    setBfsStack([...selectedParentNodes]);

    await bfsAlgorithm(
      selectedParentNodes,
      edges,
      setVisitedNodes,
      setBfsStack,
      setIsBfsInProgress
    );
  };

  const handleDfsStart = async () => {
    if (isDfsInProgress) return;
    setIsDfsInProgress(true);
    setVisitedNodes([]);
    setDfsStack([...selectedParentNodes]);

    await dfsAlgorithm(
      selectedParentNodes,
      edges,
      setVisitedNodes,
      setDfsStack,
      setIsDfsInProgress
    );
  };

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

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-[#acacac]">
      <Graph
        nodes={nodes}
        edges={edges}
        selectedParentNodes={selectedParentNodes}
        visitedNodes={visitedNodes}
        handleNodeClick={handleNodeClick}
        handleNodeContextMenu={handleNodeContextMenu}
        handleChildNodeContextMenu={handleChildNodeContextMenu}
      />
      <div className="flex mt-8">
        <button
          className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBfsStart}
          disabled={isBfsInProgress || isDfsInProgress}
        >
          BFS Visualization
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDfsStart}
          disabled={isDfsInProgress || isBfsInProgress}
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
        <strong>BFS Queue:</strong>
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
        {dfsStack
          .map((node, index) => (
            <span
              key={index}
              className="ml-2 bg-orange-500 text-white font-bold px-2 py-1 rounded"
            >
              {node}
            </span>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default Visualization;
