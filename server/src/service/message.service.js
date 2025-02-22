export const getAllUsers = async (loggedInUserId) => {
    try {
      const filteredUsers = await prisma.user.findMany({
        where: {
          id: { not: loggedInUserId }, // Exclude logged-in user
        },
      });
  
      if (!filteredUsers.length) {
        throw new customError("No users found", 404, "NotFoundError");
      }
  
      // Exclude password from response
      const usersWithoutPassword = filteredUsers.map(({ password, ...user }) => user);
  
      return {
        success: true,
        message: "Users fetched successfully",
        users: usersWithoutPassword,
      };
    } catch (error) {
      if (error instanceof customError) {
        throw error; // If it's a custom error, rethrow it
      }
      throw new customError(
        "An unexpected error occurred while fetching users",
        500,
        "ServerError",
        error.message
      );
    }
  };