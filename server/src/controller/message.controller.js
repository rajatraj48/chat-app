import { customError } from "../middleware/customError.js";
import { getAllUsers } from "../service/message.service.js";



export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user?.id; // Ensure `req.user` exists

    if (!loggedInUserId) {
      throw new customError("Unauthorized access", 401, "AuthError");
    }

    // Fetch users excluding the logged-in user
    const response = await getAllUsers(loggedInUserId);

    res.status(200).json({
        status: 200,
        success: true,
        message: "Fetched Successfully",
        response: response
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
