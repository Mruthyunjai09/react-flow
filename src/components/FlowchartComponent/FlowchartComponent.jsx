import React, { useState, useCallback } from "react";
import "./FlowchartComponent.scss";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  ReactFlowProvider,
} from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { initialNodes, initialEdges } from "./nodeEdges";
import FormComponent from "../FormComponent/FormComponent";
import FlowTableComponent from "../FlowTableComponent/FlowTableComponent";
import {
  AlertNode,
  ConditionNode,
  TaskNode,
  CustomEdge,
} from "../CustomComponents/NodesComponent";
import FormEdgeComponent from "../FormComponent/FormEdgeComponent";

const edgeOptions = {
  animated: true,
  style: {
    stroke: "black",
  },
};

const nodeTypes = {
  task: TaskNode,
  condition: ConditionNode,
  alerts: AlertNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

let nodeId = 100;

const FlowchartComponent = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [selectedEdgeFull, setSelectedEdgeFull] = useState(null);

  // Handle adding a new node
  const onClick = useCallback((type) => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      type: type,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `${type} ${id}`,
        comments: "",
        assignee: "",
        dueDate: "",
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, []);

  // Node deletion handling
  const onDeleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };


  // Handle node changes (move, delete, etc.)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle edge changes (delete, move, etc.)
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle node selection
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    setSelectedEdgeFull(null);
  };

  // Handle new edges
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Handle edge click (for deletion)
  const onEdgeClick = useCallback((edge) => {
    setSelectedEdge(edge.id);
    setSelectedEdgeFull(edge);
    setSelectedNode(null);
  }, []);

  // Delete selected edge
  const deleteSelectedEdge = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id)); // Delete the selected edge
    setSelectedEdge(null);
    setSelectedEdgeFull(null);
  };

  // Handle edit edge label
  const onEditLabel = (data) => {
    let edgesCpy = [...edges]
    console.log(data)
    console.log(edges)
    let updatedEdges = edgesCpy.map((edge) => edge.id === data.id ? data : edge)
    setEdges(updatedEdges)
  }

  return (
    <div className="flow--main">
      <div className="flow--table">
        <Accordion disabled={nodes.length === 0}>
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            {nodes.length === 0 ? (
              <Typography component="span"> Nodes List (Empty) </Typography>
            ) : (
              <Typography component="span">
                {" "}
                Nodes List ({nodes.length}){" "}
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <FlowTableComponent nodes={nodes} setNodes={setNodes} />
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="flow--body">
        <div className="flow--graph">
          <button onClick={() => onClick("task")} className="btn-add">
            Add Task Node
          </button>
          <button
            onClick={() => onClick("condition")}
            className="btn-add--condition"
          >
            Add Condition Node
          </button>
          <button onClick={() => onClick("alerts")} className="btn-add--alerts">
            Add Alert Node
          </button>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            edgeTypes={edgeTypes}
            // defaultEdgeOptions={edgeOptions}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            onNodeClick={onNodeClick}
            // edgeTypes={{ custom: CustomEdge }}
            onEdgeClick={(_, edge) => onEdgeClick(edge)}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        {selectedEdgeFull && (
          // <>
          //   <button className="button--form" onClick={deleteSelectedEdge}>Delete Selected Edge</button>
          //   <button className="button--form-edit" onClick={deleteSelectedEdge}>Edit Selected Edge</button>
          // </>
          <div className="form--style">
            <FormEdgeComponent
              edge={selectedEdgeFull}
              setSelectedEdge={setSelectedEdge}
              setSelectedEdgeFull={setSelectedEdgeFull}
              deleteSelectedEdge={deleteSelectedEdge}
              onEditLabel={onEditLabel}
              setEdges={setEdges}
            />
          </div>
        )}

        {selectedNode && (
          <div className="form--style">
            <FormComponent
              node={selectedNode}
              onDeleteNode={onDeleteNode}
              setNodes={setNodes}
              setEdges={setEdges}
              setSelectedNode={setSelectedNode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <FlowchartComponent />
    </ReactFlowProvider>
  );
}
