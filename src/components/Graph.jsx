import PropTypes from "prop-types";

const Graph = ({
  nodes,
  edges,
  selectedParentNodes,
  visitedNodes,
  handleNodeClick,
  handleNodeContextMenu,
  handleChildNodeContextMenu,
}) => {
  return (
    <div
      className="relative w-full h-[70vh] border border-[#2a2a2a] bg-[#121212]"
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
              position: "absolute",
              left: sourceNode.x + 11 + "px",
              top: sourceNode.y + 8 + "px",
              width: distance + "px",
              height: "1px",
              backgroundColor: "#2a2a2a",
              transform: `rotate(${angle}rad)`,
              transformOrigin: "0 0",
              zIndex: 1,
            }}
          />
        );
      })}
      
      {nodes.map((node, index) => (
        <div
          key={index}
          data-node-index={index}
          className="flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            position: "absolute",
            left: node.x + "px",
            top: node.y + "px",
            width: "24px",
            height: "24px",
            backgroundColor: selectedParentNodes.includes(index)
              ? "rgba(255, 86, 82, 0.2)"
              : visitedNodes.includes(index)
              ? "rgba(85, 196, 100, 0.2)"
              : "#1e1e1e",
            border: `1px solid ${
              selectedParentNodes.includes(index)
                ? "#FF5652"
                : visitedNodes.includes(index)
                ? "#55C464"
                : "#333333"
            }`,
            color: "#f0f0f0",
            zIndex: 2,
          }}
          onContextMenu={(event) => handleNodeContextMenu(event, index)}
        >
          <div
            className="flex items-center justify-center w-full h-full text-xs font-light"
            onContextMenu={(event) => handleChildNodeContextMenu(event, index)}
          >
            {node.label}
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 right-4 text-[10px] text-[#777777] font-light">
        <span>Left click: Add node • Right click: Select/Connect nodes</span>
      </div>
    </div>
  );
};

Graph.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.number.isRequired,
      target: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedParentNodes: PropTypes.arrayOf(PropTypes.number).isRequired,
  visitedNodes: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleNodeClick: PropTypes.func.isRequired,
  handleNodeContextMenu: PropTypes.func.isRequired,
  handleChildNodeContextMenu: PropTypes.func.isRequired,
};

export default Graph;