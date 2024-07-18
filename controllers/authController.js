import User from "../models/user.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const alreadyExisitingUser = await User.findOne({ email: email }); //check if there is already a user with this email

    if (alreadyExisitingUser) {
      res
        .json({
          message: "User already exists",
        })
        .status(400);
    }
    // create a new user if no user with this email exists

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();
    res
      .json({
        message: "User created successfully",
      })
      .status(201);
  } catch (err) {
    console.log(err);
  }
};
