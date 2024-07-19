import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/mailer.js";
import EmailToken from "../models/email_token.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const alreadyExisitingUser = await User.findOne({ email: email }); //check if there is already a user with this email

    if (alreadyExisitingUser) {
      res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create a new user if no user with this email exists
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    // generate email verification token
    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      process.env.JWT_EMAIL_SECRET,
      {
        expiresIn: "8h",
      }
    );

    const emailToken = new EmailToken({
      userID: newUser._id,
      token: token,
    });

    await emailToken.save();

    // send email verification link

    await sendEmail(
      newUser.email,
      "Verify your email",
      `http://localhost:3000/verify-email?token=${token}`
    );

    res.status(201).json({
      message:
        "User created successfully, please check your email for verification",
    });
  } catch (err) {
    console.log(err);
  }
};
