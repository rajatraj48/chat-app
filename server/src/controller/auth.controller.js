import { loginUser, registerUser } from "../service/auth.service.js";

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
