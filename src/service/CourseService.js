import { axiosClient } from "../axios/AxiosClient"

const getAllCourse = async () => {
    return await axiosClient.get("/SubjectLevels/get-all-subject-level?page=1")
}
const getCourseById = async (courseId) => {
    return await axiosClient.get(`/SubjectLevels/get-subject-level-by-id?subjectLevelId=${courseId}`)
}
const postBuyCourseForStudent = async (courseId) => {
    return await axiosClient.post(`/StudentJoins/create-student-join?subjectLevelId=${courseId}`)
}
export { getAllCourse, getCourseById, postBuyCourseForStudent }

