import axiosInstance from "../Redux/Slice/axiosInstance";


export const userprofile = async () => {
  try {
    const response = await axiosInstance.get('/api/auth/user/profile');
    return response.data;
  } catch (error) {
    const err = error?.response?.data || { msg: 'Profile fetch failed' };
    console.error('Profile Fetch Error:', err);
    throw err;
  }
};
