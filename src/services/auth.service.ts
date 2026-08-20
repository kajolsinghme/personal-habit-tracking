import bcrypt from "bcryptjs";
import User from "../models/user.model.ts";
import { AppError } from "../utils/errors.ts";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

export const registerUser = async (
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

  const hashedPassword = await bcrypt.hash(password, 10);

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