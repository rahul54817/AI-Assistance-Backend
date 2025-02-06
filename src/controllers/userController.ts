import { Request, Response } from "express";
import { User } from "../models/UserModel";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, password, email, confirmPassword } = req.body;
  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    return res.status(200).json({
      result: false,
      message:
        "requied parameters : username , email , password, confirmPassword",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      result: false,
      message: "password not match",
    });
  }

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        result: false,
        message: "user already exist",
      });
    }

    if (confirmPassword === password) {
      const hasPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email,
        password: hasPassword,
      });

      const data = await newUser.save();
      return res.status(200).json({
        result: true,
        message: "User signup successfully",
        data: data,
      });
    }

    return res.status(400).json({
      result: false,
      message: "Signup failed",
    });
  } catch (error: any) {
    res.status(500).json({
      result: false,
      message: error.message,
    });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  if (email === null && password === null) {
    return res.status(200).json({
      result: false,
      message: "requied fillerd : email, password",
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        result: false,
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        result: false,
        message: "password not match",
      });
    }

    const payload = {
      id: user._id,
      name: user.username,
    };

    const secret_key = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(payload, secret_key, { expiresIn: "1d" });

    res.header("Authorization", `Bearer ${token}`);
    return res.status(200).json({
      result: true,
      message: "user login successfully",
      data: {
        _id: user._id,
        token: token,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      result: false,
      message: error.message,
    });
  }
};


