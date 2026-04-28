import { tasks } from "../test_data/data.js";

export const getAllTasks = (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const getTaskById = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    const error = new Error("Id is missing or Invalid");
    error.status = 404;
    return next(error);
  }

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    const error = new Error("Task not Found");
    error.status = 404;
    return next(error);
  }

  // 3. Success path
  res.status(200).json({ success: true, data: task });
};

export const createTask = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const error = new Error("Id is missing or Invalid");
    error.status = 404;
    return next(error);
  }
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    const error = new Error("Task not Found");
    error.status = 404;
    return next(error);
  }

  res.status(200).json({ success: true, data: task });
};

export const updateTask = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    const error = new Error("Id is missing or Invalid");
    error.status = 404;
    return next(error);
  }

  const title = req.body.title;
  const description = req.body.description;
  const complete = req.body.complete;

  const taskToBeUpdated = tasks.find((task) => task.id === id);

  if (!taskToBeUpdated) {
    const error = new Error("Task not Found");
    error.status = 404;
    return next(error);
  }

  const taskUpdated = {
    ...taskToBeUpdated,
    title: req.body.title ?? taskToBeUpdated.title,
    description: req.body.description ?? taskToBeUpdated.description,
    complete: req.body.complete ?? taskToBeUpdated.complete,
  };
  tasks.push(taskUpdated);
  res.status(200).send({
    success: true,
    message: "Task updated successfully",
    data: taskUpdated,
  });
};

export const deleteTask = (req, res, next) => {
  const { id } = req.params;

  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    const error = new Error("Task not Found");
    error.status = 404;
    return next(error);
  }

  tasks.splice(index, 1);
  res
    .status(200)
    .json({ success: true, message: "Task deleted successfully", data: tasks });
};
