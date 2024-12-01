import { userAPI } from '../../services/api';

// Register user
const registerUser = async (userData) => {
  return await userAPI.registerUser(userData);
};

// Login user (example endpoint)
const loginUser = async (userData) => {
  return await userAPI.loginUser(userData);
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
