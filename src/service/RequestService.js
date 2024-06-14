import { axiosClient } from "../axios/AxiosClient"
const getAllRequestCategory = async () => {
    return await axiosClient.get("/RequestCategory/get-all-categories?page=1")
}
const postCreateRequest = async (formData) => {
    return await axiosClient.post(`/Request/create-request`, formData)

}
const getRequestByUser = async (pageindex) => {
    return await axiosClient.get(`/Request/get-all-for-user?page=${pageindex}`)
}
const updateRequestStatus = async (selectedRequests) => {
    return await axiosClient.get(`/Request/update-status-by-id?id=${selectedRequests}`)
}

export {getAllRequestCategory, postCreateRequest, getRequestByUser, updateRequestStatus}


