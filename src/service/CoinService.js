import { axiosClient } from "../axios/AxiosClient"

const getUserCoin = async () => {
    return await axiosClient.get("/Coins/get-total-coin")
}
const postDeposit = async (formData) => {
    return await axiosClient.post(`/Coins/Deposit?coin=${formData}`)
}
const postConfirmDeposit = async(detail) => {
    return await axiosClient.post('/Coins/ConfirmDeposit', detail)
}
const getUserTransaction = async (page) => {
    return await axiosClient.get(`/Coins/get-transaction-for-user?page=${page}`)
}
export { getUserCoin, postDeposit, postConfirmDeposit, getUserTransaction }