import { loginUser, registerUser, updateUser } from "../service/auth.service.js";

export const signup = async (req, res, next) => {
  try {
    // Get the user data from the request body
    const { name, username, email, password } = req.body;

    // Call the service layer to register the user
    const newUser = await registerUser(name, username, email, password);

    // Send the successful response
    res.status(201).json({
      status: 201,
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware (errorHandler)
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await loginUser(username, email, password);
    res.status(200).json({
        status: 200,
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
           
          },
    })
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.send("signup rout");
};

export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user?.id; // Ensure `req.user` exists
  
      if (!userId) {
        throw new customError("Unauthorized access", 401, "AuthError");
      }
  
      // Call the service function to update user profile
      const updatedUser = await updateUser(profilePic, userId);
  
      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  };
