import { axiosClient } from "../axios/AxiosClient";

const getAllCourse = async (page) => {
  return await axiosClient.get(
    `/SubjectLevels/get-all-subject-level?page=${page}`
  );
};
const getCourseById = async (courseId) => {
  return await axiosClient.get(
    `/SubjectLevels/get-subject-level-by-id?subjectLevelId=${courseId}`
  );
};
const postBuyCourseForStudent = async (courseId) => {
  return await axiosClient.post(
    `/StudentJoins/create-student-join?subjectLevelId=${courseId}`
  );
};

const getThreeCourseByTutorId = async (tutorId) => {
  return await axiosClient.get(
    `/SubjectLevels/get-three-subject-level-of-any-tutor?tutorId=${tutorId}&page=1`
  );
};

const getAllSubjectLevelFollowRating = async () => {
  return await axiosClient.get(
    `/SubjectLevels/get-top-6-subject-level-follow-rating?page=1`
  );
};

const getCoursePurchasedByUser = async (page) => {
  return await axiosClient.get(
    `/StudentJoins/all-student-join-for-student?page=${page}`
  );
};
const getCoursePurchasedByUserWithFilter = async (page, courseId) => {
  return await axiosClient.get(
    `/StudentJoins/all-student-join-for-student?subjectLevelId=${courseId}&page=${page}`
  );
};
const getCourseStudent = async (page) => {
  return await axiosClient.get(`/Times/times-for-student?page=${page}`);
};
const getCourseStudentWithFilter = async (subjectLevelId, page) => {
  return await axiosClient.get(
    `/Times/times-for-student?subjectLevelId=${subjectLevelId}&page=${page}`
  );
};
const postCreateTimeTutor = async (scheduleData) => {
  return await axiosClient.post(`/Times/create-time`, scheduleData);
};
export {
  getAllCourse,
  getCourseById,
  postBuyCourseForStudent,
  getCoursePurchasedByUser,
  getCoursePurchasedByUserWithFilter,
  getCourseStudent,
  getCourseStudentWithFilter,
  postCreateTimeTutor,
  getThreeCourseByTutorId,
  getAllSubjectLevelFollowRating,
};
