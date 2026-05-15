import Task from "../models/tasks.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    return next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      const error = new Error("Task not Found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    if (error.name === "CastError") {
      error.message = "Invalid Task ID format";
      error.status = 400;
    }
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    const error = new Error("Title is required");
    error.status = 400;
    return next(error);
  }

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: savedTask,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      error.message = messages.join(", ");
      error.status = 400;
    }

    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!updatedTask) {
      const error = new Error("Task not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    if (error.name === "CastError") {
      error.message = "Invalid Task ID format";
      error.status = 400;
    }
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      const error = new Error("Task not found");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    if (error.name === "CastError") {
      error.message = "Invalid Task ID format";
      error.status = 400;
    }
    next(error);
  }
};
