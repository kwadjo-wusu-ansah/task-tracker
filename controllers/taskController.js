import Task from "../models/tasks.js";
import { catchAsync } from "../utils/catchAsync.js";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const getAllTasks = catchAsync(async (req, res, next) => {
  const match = {};
  let sortOrder = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sort) {
    const isDescending = req.query.sort.startsWith("-");
    const sortBy = isDescending ? req.query.sort.substring(1) : req.query.sort;

    sortOrder[sortBy] = isDescending ? -1 : 1;
  } else {
    sortOrder["createdAt"] = -1;
  }

  const tasks = await Task.find(match).sort(sortOrder);
  res.status(200).json({ success: true, data: tasks });
});

export const getTaskById = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError("Task not Found", 404));
  }

  res.status(200).json({ success: true, data: task });
});

export const createTask = catchAsync(async (req, res, next) => {
  // If title is required in your Mongoose Schema,
  // the globalErrorHandler will catch the ValidationError automatically!
  const savedTask = await Task.create(req.body);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: savedTask,
  });
});

export const updateTask = catchAsync(async (req, res, next) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { returnDocument: "after", runValidators: true },
  );

  if (!updatedTask) {
    return next(new AppError("Task not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: updatedTask,
  });
});

export const deleteTask = catchAsync(async (req, res, next) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);

  if (!deletedTask) {
    return next(new AppError("Task not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask,
  });
});
