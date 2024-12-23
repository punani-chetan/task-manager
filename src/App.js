import React from "react";
import { TaskProvider } from "./context/TaskContext";
import AddTask from "./comoponents/AddTask";
import TaskList from "./comoponents/TaskList";
import { Container, Typography } from "@mui/material";

const App = () => {
  return (
    <TaskProvider>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Task Manager
        </Typography>
        <AddTask />
        <TaskList />
      </Container>
    </TaskProvider>
  );
};

export default App;
