import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { customError } from "../middleware/customError.js";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";

const prisma = new PrismaClient();

export const registerUser = async (name, username, email, password) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      throw new customError(
        "Email or Username already exists",
        409,
        "DuplicateError"
      );
    }

    const saltRounds = 2;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return newUser; // Return the newly created user
  } catch (error) {
    // Handle and rethrow errors appropriately
    if (error instanceof customError) {
      throw error; // If it's a CustomError, just throw it
    } else {
      // For unexpected errors, you can throw a generic error
      throw new customError(
        "An unexpected error occurred",
        500,
        "ServerError",
        error.message
      );
    }
  }
};

export const loginUser = async (username, email, password) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });
    if (!user) {
      throw new customError(
        "Invalid credentials",
        401,
        "AuthenticationError",
        "Please enter correct username"
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new customError(
        "Invalid credentials",
        401,
        "AuthenticationError",
        "Please enter correct password"
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY, // Secret key stored in environment variables
      {
        expiresIn: "1h", // Token expiration time
        algorithm: "HS256", // Algorithm used for signing
      }
    );

    // Return the user and token data
    return {
      user: { ...user },
      token: `Bearer ${token}`,
    };
  } catch (error) {
    if (error instanceof customError) {
      // If it's a CustomError, just throw it
      throw error;
    } else {
      // For any unexpected errors, create a new custom error
      throw new customError(
        "An unexpected error occurred",
        500,
        "ServerError",
        error.message
      );
    }
  }

 

};


 
export const updateUser = async (profilePic, userId) => {
    try {
      // Validate input
      if (!profilePic) {
        throw new customError("Profile picture is required", 400, "ValidationError");
      }
  
      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "user_profiles", // Optional: Organize images in a folder
      });
  
      // Ensure user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!existingUser) {
        throw new customError("User not found", 404, "NotFoundError");
      }
  
      // Update user's profile picture
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { profilePic: uploadResponse.secure_url },
      });
  
      return updatedUser; // Return the updated user
    } catch (error) {
      if (error instanceof customError) {
        throw error; // Preserve custom errors
      } else {
        throw new customError(
          "An unexpected error occurred while updating profile",
          500,
          "ServerError",
          error.message
        );
      }
    }
  };