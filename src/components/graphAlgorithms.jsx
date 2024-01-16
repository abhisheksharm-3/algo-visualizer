export const bfsAlgorithm = async (selectedParentNodes, edges, setVisitedNodes, setBfsStack, setIsBfsInProgress) => {
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
  
  export const dfsAlgorithm = async (selectedParentNodes, edges, setVisitedNodes, setDfsStack, setIsDfsInProgress) => {
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
  