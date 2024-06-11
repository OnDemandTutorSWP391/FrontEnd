import { axiosClient } from "../axios/AxiosClient"
const getAllRequestCategory = async () => {
    return await axiosClient.get("/RequestCategory/get-all-categories?page=1")
}
const postCreateRequest = async (formData, selectedCategoryRequest) => {
    return await axiosClient.post(`/Request/create-request?categoryName=${selectedCategoryRequest}`, formData)

}


export {getAllRequestCategory, postCreateRequest}


