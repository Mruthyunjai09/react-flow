import React from "react";
import { Handle, getBezierPath, getEdgeCenter } from "react-flow-renderer";
import "./NodesComponent.scss";

// Custom Edge Component
const CustomEdge = ({
  id,
  type,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  selected,
  label,
  onClick,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const edgeCenter = getEdgeCenter({ sourceX, sourceY, targetX, targetY });
  return (
    <div className="edge-custom">
      {/* Render the edge path */}
      <path
        id={id}
        style={style}
        className={`react-flow__edge-path ${selected ? "selected" : ""}`}
        d={edgePath}
        onClick={() => onClick(id)} // Trigger onClick when the edge is clicked
        type={type}
      />
      {/* Optionally render a label */}
      {label && (
        <text
          x={edgeCenter[0]}
          y={edgeCenter[1] - 10} // Slightly offset label from center
          style={{
            fontSize: "12px",
            fill: "#555",
            pointerEvents: "none",
            userSelect: "none",
            textAnchor: "middle",
          }}
        >
          {label}
        </text>
      )}
    </div>
  );
};

const TaskNode = ({ data }) => {
  return (
    <div className="task-node">
      <h3 className="node-title">Task Node</h3>
      <p className="node-description">{data.label}</p>
      <Handle type="source" position="right" className="handle-source" />
      <Handle type="target" position="left" className="handle-target" />
    </div>
  );
};

const ConditionNode = ({ data }) => {
  return (
    <div className="condition-node">
      <h3 className="node-title">Condition Node</h3>
      <p className="node-description">{data.label}</p>
      <div className="condition-branch">
        <Handle
          type="source"
          position="right"
          className="handle-source if-handle"
        />
      </div>
      <Handle type="target" position="left" className="handle-target" />
    </div>
  );
};

const AlertNode = ({ data }) => {
  return (
    <div className="alert-node">
      <h3 className="node-title">Alert Node</h3>
      <p className="node-description">{data.label}</p>
      <Handle type="source" position="right" className="handle-source" />
      <Handle type="target" position="left" className="handle-target" />
    </div>
  );
};

export { TaskNode, ConditionNode, AlertNode, CustomEdge };
