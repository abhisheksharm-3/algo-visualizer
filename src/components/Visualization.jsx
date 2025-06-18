import { useState } from "react";
import { bfsAlgorithm, dfsAlgorithm } from "./graphAlgorithms";
import Graph from "./Graph";

const Visualization = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedParentNodes, setSelectedParentNodes] = useState([]);
  const [, setSelectedChildNodes] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [isBfsInProgress, setIsBfsInProgress] = useState(false);
  const [isDfsInProgress, setIsDfsInProgress] = useState(false);
  const [bfsStack, setBfsStack] = useState([]);
  const [dfsStack, setDfsStack] = useState([]);
  const [activeAlgorithm, setActiveAlgorithm] = useState(null);

  const handleBfsStart = async () => {
    if (isBfsInProgress) return;
    setIsBfsInProgress(true);
    setActiveAlgorithm("bfs");
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
    setActiveAlgorithm("dfs");
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
    if (selectedParentNodes.length > 0 && selectedParentNodes[0] !== index) {
      setSelectedChildNodes([index]);
      const newEdges = selectedParentNodes.map((parentNode) => ({
        source: parentNode,
        target: index,
      }));
      // Check if edge already exists
      const filteredEdges = newEdges.filter(
        newEdge => !edges.some(
          existingEdge => 
            existingEdge.source === newEdge.source && 
            existingEdge.target === newEdge.target
        )
      );
      setEdges((prevEdges) => [...prevEdges, ...filteredEdges]);
    }
  };

  const renderNodeChips = (nodeList, borderColor) => {
    return nodeList.map((node, index) => (
      <span
        key={index}
        className={`ml-2 px-3 py-1 text-xs font-light rounded-full border ${borderColor} bg-[#1a1a1a] text-[#f0f0f0]`}
      >
        {node}
      </span>
    ));
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#121212] text-[#f0f0f0]">
      
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <h1 className="text-2xl font-light tracking-wide mb-8 text-center">
          Graph Algorithm Visualization
        </h1>
        
        <Graph
          nodes={nodes}
          edges={edges}
          selectedParentNodes={selectedParentNodes}
          visitedNodes={visitedNodes}
          handleNodeClick={handleNodeClick}
          handleNodeContextMenu={handleNodeContextMenu}
          handleChildNodeContextMenu={handleChildNodeContextMenu}
        />
        
        <div className="mt-10 flex flex-col items-center">
          <div className="flex space-x-4 mb-8">
            <button
              className={`px-8 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
                activeAlgorithm === "bfs"
                  ? "bg-[#1e1e1e] text-[#f0f0f0] border border-[#333333]"
                  : "text-[#777777] hover:text-[#f0f0f0]"
              }`}
              onClick={handleBfsStart}
              disabled={isBfsInProgress || isDfsInProgress}
            >
              BFS
            </button>
            <button
              className={`px-8 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
                activeAlgorithm === "dfs"
                  ? "bg-[#1e1e1e] text-[#f0f0f0] border border-[#333333]"
                  : "text-[#777777] hover:text-[#f0f0f0]"
              }`}
              onClick={handleDfsStart}
              disabled={isDfsInProgress || isBfsInProgress}
            >
              DFS
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            <div className="p-5 border border-[#2a2a2a] bg-[#1a1a1a]">
              <div className="text-xs uppercase tracking-wider text-[#777777] mb-3">Visited</div>
              <div className="flex flex-wrap">
                {renderNodeChips(visitedNodes, "border-[#55C464]")}
                {visitedNodes.length === 0 && <span className="text-xs text-[#555555]">None</span>}
              </div>
            </div>
            
            <div className="p-5 border border-[#2a2a2a] bg-[#1a1a1a]">
              <div className="text-xs uppercase tracking-wider text-[#777777] mb-3">BFS Queue</div>
              <div className="flex flex-wrap">
                {renderNodeChips(bfsStack, "border-[#E4A537]")}
                {bfsStack.length === 0 && <span className="text-xs text-[#555555]">Empty</span>}
              </div>
            </div>
            
            <div className="p-5 border border-[#2a2a2a] bg-[#1a1a1a]">
              <div className="text-xs uppercase tracking-wider text-[#777777] mb-3">DFS Stack</div>
              <div className="flex flex-wrap">
                {renderNodeChips(dfsStack.slice().reverse(), "border-[#4C8BF5]")}
                {dfsStack.length === 0 && <span className="text-xs text-[#555555]">Empty</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;