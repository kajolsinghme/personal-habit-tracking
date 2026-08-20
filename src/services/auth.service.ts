import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.ts";
import { AppError } from "../utils/errors.ts";

import type {
  LoginInput,
  RegisterInput,
} from "../validators/auth.validator.ts";

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const registerUserService = async (
  data: RegisterInput,
): Promise<RegisterResponse> => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(
      "User with this email already exists",
      409,
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
};

export const loginUserService = async (
  data: LoginInput,
): Promise<LoginResponse> => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  };
};