import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

// User Registration
export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const name = email.split("@")[0];

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    
    res.status(201).json({ message: "User registered Successfully", token });
  } catch (error) {
    next({ status: 400, message: "Error registering user", error });
  }
};

// User Login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next({ status: 404, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next({ status: 401, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json(token);
  } catch (error) {
    next({ status: 500, message: "Error logging in", error });
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return next({ status: 400, message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    next({ status: 500, message: "Error resetting password", error });
  }
};

// Password Reset Request
export const requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next({ status: 404, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `<p>To reset your password, click the link: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    next({ status: 500, message: "Error sending email", error });
  }
};
