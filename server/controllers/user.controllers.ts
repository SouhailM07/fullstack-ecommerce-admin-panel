import { Request, Response } from "express";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(200).send(users);
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneUser = await User.findOne({ clerkId: id });
    if (!oneUser) {
      return res.status(404).send("user was not found");
    }
    return res.status(200).send(oneUser);
  } catch (error: any) {
    res.status(500).send(error.errmsg);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { clerkId, shoppingList } = req.body;
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      // If user exists, send a response indicating so
      return res.status(200).send("User already exists");
    }
    // If user does not exist, create a new user
    let newUser = new User({ clerkId, shoppingList });
    await newUser.save();
    res.status(201).send("New user was added successfully");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const values = req.body;
    const editUser = await User.findOneAndUpdate({ clerkId: id }, values);
    if (!editUser) {
      return res.status(404).send("user was not found");
    }
    res.status(201).send("user info was updated");
  } catch (error: any) {
    res.status(500).send(error.errmsg);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send("user was not found");
    }
    res.status(201).send("a user was deleted successfully");
  } catch (error: any) {
    res.status(500).send(error.errmsg);
  }
};
