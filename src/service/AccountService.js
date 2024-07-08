import { axiosClient } from "../axios/AxiosClient"
const postLogin = async (formData) => {
    try {
      return await axiosClient.post("/Users/SignIn", formData);
    } catch (error) {
     
    }
  }
const getUserProfile = async () => {
  return await axiosClient.get("/Users/GetUserProfile")
}
const postRegister = async (formData) => {
  return await axiosClient.post("/Users/SignUp", formData)
}
const postForgetPassword = async (formData) => {
  return await axiosClient.post("/Users/ForgotPassword", formData)
}
const postResetPassword = async (formData) => {
  return await axiosClient.post("/Users/ResetPassword", formData)
}
const updateUserProfile = async (userData) => {
  return await axiosClient.put(`/Users/UpdateUserProfile`, userData);
};
 export { postLogin, getUserProfile, postRegister, postForgetPassword, postResetPassword, updateUserProfile };