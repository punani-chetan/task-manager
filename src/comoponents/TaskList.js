import React, { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";
import { Checkbox, List, ListItem, ListItemText } from "@mui/material";

const TaskList = () => {
  const { tasks, fetchTasks, updateTask } = useTask();

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleCompletion = (task) => {
    updateTask(task.id, { ...task, completed: !task.completed });
  };

  return (
    <List>
      {tasks &&
        tasks.map((task) => (
          <ListItem
            key={task._id}
            style={{ display: "flex", gap: "10px" }}
            divider
          >
            <Checkbox
              checked={task.completed}
              onChange={() => toggleCompletion(task)}
            />
            <ListItemText
              primary={task.title}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            />
          </ListItem>
        ))}
    </List>
  );
};

export default TaskList;
