import { useState, useEffect } from "react";
import { getAllCourse } from "../../service/CourseService";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../axios/AxiosClient";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Pagination, PaginationItem, Stack } from "@mui/material";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [tutorInfo, setTutorInfo] = useState({});
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourse(page);
        console.log("Courses response:", response);
        if (response.data && response.data.data) {
          setCourses(response.data.data);
          setTotalPages(response.data.totals);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [page]);

  useEffect(() => {
    const fetchTutors = async () => {
      if (courses.length > 0) {
        try {
          // Lấy danh sách tên tutor duy nhất
          const uniqueTutorNames = [
            ...new Set(courses.map((course) => course.tutorName)),
          ];

          // Tạo một object để lưu trữ thông tin tutor
          let tutorInfoMap = {};

          // Gọi API cho từng tên tutor
          for (const tutorName of uniqueTutorNames) {
            const response = await axiosClient.get(
              `/Tutors/get-all-tutors-for-student?search=${tutorName}`
            );
            console.log(`Response for ${tutorName}:`, response);

            if (response.data.success && response.data.data.length > 0) {
              // Giả sử API trả về một mảng, chúng ta lấy phần tử đầu tiên
              tutorInfoMap[tutorName] = response.data.data[0];
            }
          }

          setTutorInfo(tutorInfoMap);
        } catch (error) {
          console.error("Error fetching tutors:", error);
        }
      }
    };

    fetchTutors();
  }, [courses]);

  const handleClickOnRow = (id) => {
    navigate(`/course-detail/${id}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <div
        className="breadcrumb-area bg-overlay"
        style={{ backgroundColor: "#143254" }}
      >
        <div className="container">
          <div className="breadcrumb-inner">
            <div className="section-title mb-0 text-center">
              <h2 className="page-title">Courses</h2>
              <ul className="page-list">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>Courses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-area pd-top-120 pd-bottom-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 order-lg-12">
              <div className="row">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <div className="col-md-6" key={course.id}>
                      <div
                        className="single-course-inner cursor-pointer shadow-2xl"
                        onClick={() => handleClickOnRow(course.id)}
                      >
                        <div className="thumb">
                          <img
                            src={course.image}
                            className="h-40 w-96"
                            alt="course img"
                          />
                        </div>
                        <div className="details">
                          <div className="details-inner">
                            <div className="emt-user">
                              <img
                                className="w-14 h-14 rounded-full object-cover"
                                src={tutorInfo[course.tutorName]?.avatar}
                                alt={`${course.tutorName}'s avatar`}
                              />
                              <span className="align-self-center !text-xl !font-bold">
                                {course.tutorName}
                              </span>
                              <span className=" !ml-10 tutor-info !text-xl !font-bold !text-red-200">
                                {tutorInfo[course.tutorName]?.workPlace}
                              </span>
                            </div>
                            <h6 className="no-underline !text-3xl !font-bold">
                              {course.subjectName}
                            </h6>
                          </div>
                          <div className="emt-course-meta">
                            <div className="row">
                              <div className="col-6">
                                <div className="rating">
                                  <i className="fa fa-star"></i>{" "}
                                  {tutorInfo[course.tutorName]?.averageStar ||
                                    "N/A"}
                                  <span>
                                    (
                                    {tutorInfo[course.tutorName]
                                      ?.totalReviews || 0}
                                    )
                                  </span>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="price text-right">
                                  Price: <span>{course.coin} coin</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No courses available.</p>
                )}
              </div>
              <nav className="td-page-navigation">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Stack>
              </nav>
            </div>
            <div className="col-lg-4 order-lg-1 col-12">
              <div className="td-sidebar mt-5 mt-lg-0">
                <div className="widget widget_search_course">
                  <h4 className="widget-title">Search</h4>
                  <form className="search-form single-input-inner">
                    <input type="text" placeholder="Search here" />
                    <button className="btn btn-base w-100 mt-3" type="submit">
                      <i className="fa fa-search"></i> SEARCH
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
