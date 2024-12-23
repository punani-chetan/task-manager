import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

const TaskContext = createContext();

const initialState = { task: [], loading: true };

const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, task: action.payload, loading: false };
    case "ADD_TASK":
      return {
        ...state,
        task: [...state.task, action.payload],
        loading: false,
      };
    case "DELETE_TASK":
      return {
        task: state.task.filter((task) => task.id !== action.payload),
        loading: false,
      };
    case "UPDATE_TASK":
      return {
        ...state,
        task: state.task.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/api/tasks");
    dispatch({ type: "SET_TASKS", payload: response.data });
  };

  const addTask = async (title) => {
    const response = await axios.post("http://localhost:5000/api/tasks/add", {
      title,
    });
    dispatch({ type: "ADD_TASK", payload: response.data });
  };

  const updateTask = async (id, data) => {
    const response = await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      data
    );
    dispatch({ type: "UPDATE_TASK", payload: response.data });
  };

  return (
    <TaskContext.Provider value={{ ...state, fetchTasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
