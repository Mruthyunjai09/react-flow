import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableContainer: {
    backgroundColor: "rgb(197, 191, 191)",
  },
  tableCell: {
    padding: "4px 8px", // Reduce padding for smaller cell height
  },
});

const FlowTableComponent = ({ nodes, setNodes }) => {
  const [editIdx, setEditIdx] = useState(-1);
  const [editedNode, setEditedNode] = useState({});
  const classes = useStyles();

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditedNode(nodes[idx]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNode((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    nodes[editIdx] = editedNode;
    setEditIdx(-1);
    let updatedOne = [...nodes];
    setNodes(updatedOne);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Node Type</TableCell>
            <TableCell>Node Name</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nodes.map((node, idx) => (
            <TableRow key={idx}>
              <TableCell className={classes.tableCell} >{node.type}</TableCell>
              <TableCell className={classes.tableCell}>
                {editIdx === idx ? (
                  <TextField
                    name="label"
                    size="small"
                    value={editedNode.data.label}
                    onChange={handleChange}
                  />
                ) : node?.data?.label ? (
                  node?.data?.label
                ) : (
                  "NA"
                )}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {editIdx === idx ? (
                  <TextField
                    name="comments"
                    size="small"
                    value={editedNode.data.comments}
                    onChange={handleChange}
                  />
                ) : node?.data?.comments ? (
                  node?.data?.comments
                ) : (
                  "NA"
                )}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {editIdx === idx ? (
                  <TextField
                    name="assignee"
                    size="small"
                    value={editedNode.data.assignee}
                    onChange={handleChange}
                  />
                ) : node?.data?.assignee ? (
                  node?.data?.assignee
                ) : (
                  "NA"
                )}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {editIdx === idx ? (
                  <IconButton onClick={handleSave}>Save </IconButton>
                ) : (
                  <IconButton onClick={() => handleEdit(idx)}>Edit ✏️</IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlowTableComponent;
