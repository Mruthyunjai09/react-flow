import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./FormComponent.scss";

const FormEdgeComponent = ({ edge, setEdges, setSelectedEdge, selectedEdge, setSelectedEdgeFull, deleteSelectedEdge, onEditLabel }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: edge,
  });

  // Handle form submit
  const onSubmit = (data) => {
    let updates = {...edge}
   
    for(let update in updates) {
        if(update?.key === 'label') {
            updates['label'] = data.label
        } else if(update?.key == undefined) {
            updates['label'] = data.label
        }
    }
    onEditLabel(updates)
  };

  const handleDeleteEdge = () => {
    deleteSelectedEdge(edge?.id)
  }

  const handleClose = () => {
    setSelectedEdge(null);
    setSelectedEdgeFull(null);
  };

  useEffect(() => {
    if (edge) {
      reset(edge);
    }
  }, [edge, reset]);

  return (
    <form className="form--component" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form--head">
        Edge Configuration
        <div className="form--close" onClick={handleClose}>
          X
        </div>
      </h3>

      {/* Edit the edge type */}

      <div className="form--rows">
        <label className="form--label">Edge Name</label>
        <input className="form--input" {...register("label")} />
      </div>

      {/* Submit Button */}

      <button type="submit">Edit Edge</button>
      <button type="button" onClick={handleDeleteEdge}>Delete Edge</button>
    </form>
  );
};

export default FormEdgeComponent;
