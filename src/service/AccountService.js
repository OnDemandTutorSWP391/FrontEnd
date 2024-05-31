import { axiosClient } from "../axios/AxiosClient"
const postLogin = async (formData) => {
    try {
      return await axiosClient.post("/Users/SignIn", formData);
    } catch (error) {
     
    }
  }
 
 export { postLogin };