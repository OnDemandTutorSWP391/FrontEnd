import { axiosClient } from "../axios/AxiosClient";

const postTutorRegister = async (formData) => {
    return await axiosClient.post("/Tutors/register-tutor", formData)
}
export { postTutorRegister };