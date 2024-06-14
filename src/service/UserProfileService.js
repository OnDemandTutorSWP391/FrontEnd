import { axiosClient } from "../axios/AxiosClient"
const getUserProfile = async () => {
    return await axiosClient.get("/Users/GetUserProfile")
}




export {getUserProfile}