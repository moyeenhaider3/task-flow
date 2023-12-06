import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = {
      title,
      description,
      user: req.user,
    };
    await Task.create(task);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
export const getAllMyTask =async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log(userId)
    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
