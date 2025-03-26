import React from 'react';
import { Handle } from 'react-flow-renderer';
import './NodesComponent.scss';

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
        <Handle type="source" position="right" id="if" className="handle-source if-handle" />
      </div>
      <div className="condition-branch">
        <Handle type="source" position="right" id="else" className="handle-source else-handle" />
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
  

export { TaskNode, ConditionNode, AlertNode };
