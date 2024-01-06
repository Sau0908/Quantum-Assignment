import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/authSchema.js";

const JWT_SECRET = "yourSecretValue";

export const signup = async (req, res) => {
  const { username, dateOfBirth, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      dateOfBirth,
      password: hashedPassword,
      message: [],
    });
    console.log("yahiii hai ", newUser._id);
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't Exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
