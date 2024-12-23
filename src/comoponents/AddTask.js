import React, { useState } from "react";
import { useTask } from "../context/TaskContext";
import { Button, TextField } from "@mui/material";

const AddTask = () => {
  const { addTask } = useTask();
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
    >
      <TextField
        label="Task"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Add Task
      </Button>
    </form>
  );
};

export default AddTask;
