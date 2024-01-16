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
      className="relative w-full h-5/6 border border-[#acacac]"
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
              backgroundColor: "#acacac",
              transform: `rotate(${angle}rad)`,
              transformOrigin: "0 0",
            }}
          />
        );
      })}
      {nodes.map((node, index) => (
        <div
          key={index}
          data-node-index={index}
          className="text-center flex items-center justify-center text-white rounded-2xl"
          style={{
            position: "absolute",
            left: node.x + "px",
            top: node.y + "px",
            width: "20px",
            height: "20px",
            backgroundColor: selectedParentNodes.includes(index)
              ? "red"
              : visitedNodes.includes(index)
              ? "#49B618"
              : "blue",
          }}
          onContextMenu={(event) => handleNodeContextMenu(event, index)}
        >
          <div
            className="text-center flex items-center justify-center w-full h-full cursor-context-menu"
            onContextMenu={(event) => handleChildNodeContextMenu(event, index)}
          >
            {node.label}
          </div>
        </div>
      ))}
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
