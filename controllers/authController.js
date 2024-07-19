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
      `http://localhost:3000/api/auth/verify-email?token=${token}`
    );

    res.status(201).json({
      message:
        "User created successfully, please check your email for verification",
    });
  } catch (err) {
    console.log(err);
  }
};

export const verifyEmail = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(404).json({
      message: "Token not found",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
    const userID = payload._id;
    const email = payload.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.emailVerified) {
      // user already verified
      return res.status(200).json({
        message: "User already verified",
      });
    }
    const emailToken = await EmailToken.findOneAndDelete(
      { userID: userID, token: token },
      { new: true }
    );
    if (!emailToken) {
      // token is expired
      return res.status(400).json({
        message: "Token expired",
      });
    }

    // mark email as verified
    await User.findByIdAndUpdate(
      userID,
      { emailVerified: true },
      { new: true }
    );

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
