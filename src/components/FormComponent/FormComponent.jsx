import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import './FormComponent.scss'

const FormComponent = ({ node, onDeleteNode, setNodes, setEdges, setSelectedNode }) => {
  console.log(node);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: node.data, 
  });

  // Handle form submit
  const onSubmit = (data) => {
    const updatedNode = { ...node, data };
    setNodes((nds) => nds.map((n) => (n.id === node.id ? updatedNode : n)));
  };

  // Delete the node
  const handleDeleteNode = () => {
    onDeleteNode(node.id);
    setSelectedNode(null)
  };

  const handleClose = () => {
    setSelectedNode(null)
  }

  // Reset form values when the selected node changes
  useEffect(() => {
    reset(node.data);
  }, [node, reset]);

  return (
    <form className="form--component" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form--head">
        {node.type.charAt(0).toUpperCase() + node.type.slice(1)} Node
        Configuration
        <div className="form--close" onClick={handleClose}>X</div>
      </h3>

      {/* Task Node Fields */}
      {node.type === "task" && (
        <>
          <div className="form--rows">
            <label className="form--label">Task Name</label>
            <input className="form--input" {...register("label")} />
          </div>
          <div className="form--rows">
            <label className="form--label">Comments</label>
            <input className="form--input" {...register("comments")} />
          </div>
          <div className="form--rows">
            <label className="form--label">Assignee</label>
            <input className="form--input" {...register("assignee")} />
          </div>
          <div className="form--rows">
            <label className="form--label">Due Date</label>
            <input className="form--input" type="date" {...register("dueDate")} />
          </div>
        </>
      )}

      {/* Condition Node Fields */}
      {node.type === "condition" && (
        <>
          <div className="form--rows">
            <label className="form--label">Condition Name</label>
            <input className="form--input" {...register("label")} />
          </div>
          <div className="form--rows">
            <label className="form--label">Condition Type</label>
            <input className="form--input" {...register("comments")} />
          </div>
        </>
      )}

      {/* Notification Node Fields */}
      {node.type === "alerts" && (
        <>
          <div className="form--rows">
            <label className="form--label">Alert Title</label>
            <input className="form--input" {...register("label")} />
          </div>
          <div className="form--rows">
            <label className="form--label">Alert Message</label>
            <input className="form--input" {...register("comments")} />
          </div>
        </>
      )}

      {/* Submit Button */}
      <button type="submit">Save</button>
      <button type="button" onClick={handleDeleteNode}>
        Delete Node
      </button>
    </form>
  );
};

export default FormComponent;
