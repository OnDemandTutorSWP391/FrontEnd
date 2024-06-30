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
const getRequestByUserWithSearch = async (pageindex, search) => {
    return await axiosClient.get(`/Request/get-all-for-user?search=${search}&page=${pageindex}`)
}
const getRequestByUserWithSearchandFromDate = async (pageindex, search, fromDate) => {
    return await axiosClient.get(`/Request/get-all-for-user?search=${search}&from=${fromDate}&page=${pageindex}`)
}
const getRequestByUserWithSearchandFromDateToDate = async (pageindex, search, fromDate, toDate) => {
    return await axiosClient.get(`/Request/get-all-for-user?search=${search}&from=${fromDate}&to=${toDate}&page=${pageindex}`)
}

const updateRequestStatus = async (selectedRequests) => {
    return await axiosClient.get(`/Request/update-status-by-id?id=${selectedRequests}`)
}
const getAllRequestForMod = async (page) => {
    return await axiosClient.get(`/Request/get-all?page=${page}`)
}

const getRequestByUserWithFromDate = async (pageindex, fromDate) => {
    return await axiosClient.get(`/Request/get-all-for-user?from=${fromDate}&page=${pageindex}`)
}
const getRequestByUserWithFromDatendTodate = async (pageindex, fromDate, toDate) => {
    return await axiosClient.get(`/Request/get-all-for-user?from=${fromDate}&to=${toDate}&page=${pageindex}`)
}
const getRequestByModerator = async (pageindex) => {
    return await axiosClient.get(`/Request/get-all?page=${pageindex}`)
}
const getRequestByModeratorhaveUserId = async (pageindex, userId) => {
    return await axiosClient.get(`/Request/get-all?userId=${userId}&page=${pageindex}`)
}

export {getAllRequestCategory, 
    postCreateRequest, 
    getRequestByUser, 
    updateRequestStatus, 
    getAllRequestForMod, 
    getRequestByUserWithSearch, 
    getRequestByUserWithSearchandFromDate,
    getRequestByUserWithSearchandFromDateToDate,
    getRequestByUserWithFromDate,
    getRequestByUserWithFromDatendTodate,
    getRequestByModerator,
    getRequestByModeratorhaveUserId
}


