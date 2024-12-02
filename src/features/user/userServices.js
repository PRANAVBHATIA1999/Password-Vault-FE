import { userAPI } from '../../services/api';

// Register user
const registerUser = async (userData) => {
  return await userAPI.registerUser(userData);
};

// Login user (example endpoint)
// const loginUser = async (userData) => {
//   return await userAPI.loginUser(userData);
// };


const loginUser = async (userData) => {
    const response = await userAPI.loginUser(userData);
  
    // Return the complete response, including userType
    return response;
  };

// Get user profile (example endpoint)
const getProfile = async () => {
  return await userAPI.getProfile();
};

const userService = {
  registerUser,
  loginUser,
  getProfile,
};

export default userService;
