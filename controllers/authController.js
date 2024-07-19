import User from "../models/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const alreadyExisitingUser = await User.findOne({ email: email }); //check if there is already a user with this email

    if (alreadyExisitingUser) {
      res.status(400).json({
        message: "User already exists",
      });
    }
    // create a new user if no user with this email exists

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
