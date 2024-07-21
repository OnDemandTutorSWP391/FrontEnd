import { useEffect, useState } from "react";
import {
  getCourseById,
  getThreeCourseByTutorId,
  postBuyCourseForStudent,
} from "../../service/CourseService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { axiosClient } from "../../axios/AxiosClient";
import useToggleStore from "../../components/Header/useToggleStore";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [course3, setCourse3] = useState(null);
  const [tutorAvatar, setTutorAvatar] = useState(null);
  const { isActive, toggle } = useToggleStore();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const fetchTutorAvatar = async (tutorName) => {
    try {
      const response = await axiosClient.get(
        `/Tutors/get-all-tutors-for-student?search=${tutorName}`
      );

      if (response.data.success && response.data.data.length > 0) {
        setTutorAvatar(response.data.data[0].avatar);
        console.log(setTutorAvatar);
      }
    } catch (error) {
      console.error("Error fetching tutor avatar:", error);
    }
  };

  const course3s = async (tutorId) => {
    try {
      const response = await getThreeCourseByTutorId(tutorId);

      setCourse3(response.data.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const fetchRatings = async (tutorId) => {
    try {
      const response = await axiosClient.get(
        `/Ratings/get-ratings-by-tutor-id?tutorId=${tutorId}`
      );
      if (response.data.success) {
        setRatings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(courseId);

        setCourse(response.data.data);
        if (response.data.data && response.data.data.tutorName) {
          fetchTutorAvatar(response.data.data.tutorName);
          fetchRatings(response.data.data.tutorId);
          course3s(response.data.data.tutorId);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourse();
  }, [courseId, isActive]);

  if (!course) {
    return <div>Loading...</div>; // Add loading indicator while fetching data
  }
  const handleBuyCourse = async (e) => {
    e.preventDefault();

    const response = await postBuyCourseForStudent(courseId);
    console.log(response);
    if (response.err) {
      toast.error(response.err.response.data.message);
    } else {
      toggle();
      toast.success("Đăng ký khóa học thành công");
    }
  };
  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.star, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const countRatings = (star) => {
    return ratings.filter((rating) => rating.star === star).length;
  };

  const calculatePercentage = (count) => {
    if (ratings.length === 0) return 0;
    return ((count / ratings.length) * 100).toFixed(0);
  };

  const handleClickOnRow = (id) => {
    console.log(id);
    navigate(`../course-detail/${id}`);
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
              <h2 className="page-title">Courses Detail</h2>
             
            </div>
          </div>
        </div>
      </div>
      <div className="course-single-area pd-top-120 pd-bottom-90">
        <div className="container !shadow-xl">
          <div className="row">
            <div className="col-lg-8">
              <div className="course-course-detaila-inner">
                <div className="details-inner">
                  <div className="emt-user">
                    <img
                      className="w-14 h-14 rounded-full object-cover"
                      src={tutorAvatar || "assets/img/author/1.png"}
                      alt={`${course.tutorName}'s avatar`}
                    />
                  </div>
                  <h3 className="title">{course.tutorName}</h3>
                </div>
                <div className="thumb">
                  <img src={course.image} className="w-full h-96" alt="img" />
                </div>
                <div className="course-details-nav-tab text-center">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="tab1-tab"
                        data-toggle="tab"
                        href="#tab1"
                        role="tab"
                        aria-controls="tab1"
                        aria-selected="true"
                      >
                        Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="tab2-tab"
                        data-toggle="tab"
                        href="#tab2"
                        role="tab"
                        aria-controls="tab2"
                        aria-selected="false"
                      >
                        Curriculum
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="tab3-tab"
                        data-toggle="tab"
                        href="#tab3"
                        role="tab"
                        aria-controls="tab3"
                        aria-selected="false"
                      >
                        FAQ
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="tab4-tab"
                        data-toggle="tab"
                        href="#tab4"
                        role="tab"
                        aria-controls="tab4"
                        aria-selected="false"
                      >
                        Review
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="tab1"
                    role="tabpanel"
                    aria-labelledby="tab1-tab"
                  >
                    <div className="course-details-content">
                      <p>{course.description}</p>
                      <div className="row pt-4">
                        <div className="col-sm-6">
                          <ul className="single-list-wrap">
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check"></i> Metus interdum
                              metus
                            </li>
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check"></i> Ligula cur
                              maecenas
                            </li>
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check"></i> Fringilla nulla
                            </li>
                          </ul>
                        </div>
                        <div className="col-sm-6 mt-3 mt-sm-0">
                          <ul className="single-list-wrap">
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check"></i> Metus interdum
                              metus
                            </li>
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check"></i> Ligula cur
                              maecenas
                            </li>
                            <li className="single-list-inner style-check-box">
                              <i className="fa fa-check"></i> Fringilla nulla
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tab2"
                    role="tabpanel"
                    aria-labelledby="tab2-tab"
                  >
                    <div className="course-details-content">
                      <h4 className="title">Overview</h4>
                      <p>
                        The quick, brown fox jumps over a lazy dog. DJs flock by
                        when MTV ax quiz prog. Junk MTV quiz graced by fox
                        whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad
                        nymph, for quick jigs vex! Fox nymphs grab
                      </p>
                      <div id="accordion" className="accordion-area mt-4">
                        <div className="card single-faq-inner style-no-border">
                          <div className="card-header" id="ff-one">
                            <h5 className="mb-0">
                              <button
                                className="btn-link"
                                data-toggle="collapse"
                                data-target="#f-one"
                                aria-expanded="true"
                                aria-controls="f-one"
                              >
                                01. What does you simply dummy in do ?
                                <i className="fa fa-eye"></i>
                              </button>
                            </h5>
                          </div>
                          <div
                            id="f-one"
                            className="show collapse"
                            aria-labelledby="ff-one"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              What does you dummy text of free available in
                              market printing has industry been industry's
                              standard dummy text ever.
                            </div>
                          </div>
                        </div>
                        <div className="card single-faq-inner style-no-border">
                          <div className="card-header" id="ff-two">
                            <h5 className="mb-0">
                              <button
                                className="btn-link collapsed"
                                data-toggle="collapse"
                                data-target="#f-two"
                                aria-expanded="true"
                                aria-controls="f-two"
                              >
                                02. What graphics dummy of free design ?
                                <i className="fa fa-eye"></i>
                              </button>
                            </h5>
                          </div>
                          <div
                            id="f-two"
                            className="collapse"
                            aria-labelledby="ff-two"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              What graphics simply dummy text of free available
                              in market printing industry has been industry's
                              standard dummy text ever.
                            </div>
                          </div>
                        </div>
                        <div className="card single-faq-inner style-no-border">
                          <div className="card-header" id="ff-three">
                            <h5 className="mb-0">
                              <button
                                className="btn-link collapsed"
                                data-toggle="collapse"
                                data-target="#f-three"
                                aria-expanded="true"
                                aria-controls="f-three"
                              >
                                03. Why we are the best ?
                                <i className="fa fa-eye"></i>
                              </button>
                            </h5>
                          </div>
                          <div
                            id="f-three"
                            className="collapse"
                            aria-labelledby="ff-three"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              Why we are dummy text of free available in market
                              printing industry has been industry's standard
                              dummy text ever.
                            </div>
                          </div>
                        </div>
                        <div className="card single-faq-inner style-no-border">
                          <div className="card-header" id="ff-four">
                            <h5 className="mb-0">
                              <button
                                className="btn-link collapsed"
                                data-toggle="collapse"
                                data-target="#f-four"
                                aria-expanded="true"
                                aria-controls="f-four"
                              >
                                04. What industries dummy covered ?
                                <i className="fa fa-eye"></i>
                              </button>
                            </h5>
                          </div>
                          <div
                            id="f-four"
                            className="collapse"
                            aria-labelledby="ff-four"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              What industries text of free available in market
                              printing industry has been industry's standard
                              dummy text ever.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tab3"
                    role="tabpanel"
                    aria-labelledby="tab3-tab"
                  >
                    <div className="course-details-content">
                      <h4 className="title">Overview</h4>
                      <p>
                        The quick, brown fox jumps over a lazy dog. DJs flock by
                        when MTV ax quiz prog. Junk MTV quiz graced by fox
                        whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad
                        nymph, for quick jigs vex! Fox nymphs grab
                      </p>
                      <div id="accordion-1" className="accordion-area mt-4">
                        <div className="card single-faq-inner style-header-bg">
                          <div className="card-header" id="ff-five">
                            <h5 className="mb-0">
                              <button
                                className="btn-link"
                                data-toggle="collapse"
                                data-target="#f-five"
                                aria-expanded="true"
                                aria-controls="f-five"
                              >
                                01. What does you simply dummy in do ?
                                <i className="fa fa-eye"></i>
                              </button>
                            </h5>
                          </div>
                          <div
                            id="f-five"
                            className="show collapse"
                            aria-labelledby="ff-five"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              What does you dummy text of free available in
                              market printing has industry been industry's
                              standard dummy text ever.
                            </div>
                          </div>
                        </div>
                        <div className="card single-faq-inner style-header-bg">
                          <div className="card-header" id="ff-six">
                            <h5 className="mb-0">
                              <button
                                className="btn-link collapsed"
                                data-toggle="collapse"
                                data-target="#f-six"
                                aria-expanded="true"
                                aria-controls="f-six"
                              >
                                02. What graphics dummy of free design ?
                                <i className="fa fa-eye"></i>
                              </button>
                            </h5>
                          </div>
                          <div
                            id="f-six"
                            className="collapse"
                            aria-labelledby="ff-six"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              What graphics simply dummy text of free available
                              in market printing industry has been industry's
                              standard dummy text ever.
                            </div>
                          </div>
                        </div>
                        <div className="card single-faq-inner style-header-bg">
                          <div className="card-header" id="ff-seven">
                            <h5 className="mb-0">
                              <button
                                className="btn-link collapsed"
                                data-toggle="collapse"
                                data-target="#f-seven"
                                aria-expanded="true"
                                aria-controls="f-seven"
                              >
                                03. Why we are the best ?
                                <i className="fa fa-eye"></i>
                              </button>
                            </h5>
                          </div>
                          <div
                            id="f-seven"
                            className="collapse"
                            aria-labelledby="ff-seven"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              Why we are dummy text of free available in market
                              printing industry has been industry's standard
                              dummy text ever.
                            </div>
                          </div>
                        </div>
                        <div className="card single-faq-inner style-header-bg">
                          <div className="card-header" id="ff-eight">
                            <h5 className="mb-0">
                              <button
                                className="btn-link collapsed"
                                data-toggle="collapse"
                                data-target="#f-eight"
                                aria-expanded="true"
                                aria-controls="f-eight"
                              >
                                04. What industries dummy covered ?
                                <i className="fa fa-eye"></i>
                              </button>
                            </h5>
                          </div>
                          <div
                            id="f-eight"
                            className="collapse"
                            aria-labelledby="ff-eight"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              What industries text of free available in market
                              printing industry has been industry's standard
                              dummy text ever.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="tab4"
                    role="tabpanel"
                    aria-labelledby="tab4-tab"
                  >
                    <div className="ratings-list-inner mb-4">
                      <div className="row">
                        <div className="col-md-4 align-self-center text-center">
                          <div className="total-avarage-rating">
                            <h2>{calculateAverageRating()}</h2>
                            <div className="rating-inner">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={`fa fa-star${
                                    star <= calculateAverageRating() ? "" : "-o"
                                  }`}
                                ></i>
                              ))}
                            </div>
                            <p>
                              Rated {calculateAverageRating()} out of{" "}
                              {ratings.length} Ratings
                            </p>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <ul>
                            {[5, 4, 3, 2, 1].map((star) => {
                              const count = countRatings(star);
                              const percentage = calculatePercentage(count);
                              return (
                                <li key={star}>
                                  <a href="#">
                                    <span className="counter-label">
                                      <i className="fa fa-star"></i>
                                      {star}
                                    </span>
                                    <span className="progress-bar-inner">
                                      <span className="progress">
                                        <span
                                          className="progress-bar"
                                          role="progressbar"
                                          aria-valuenow={percentage}
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{ width: `${percentage}%` }}
                                        ></span>
                                      </span>
                                    </span>
                                    <span className="counter-count">
                                      {percentage}%
                                    </span>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="td-sidebar !shadow-xl !rounded-2xl">
                <div className="widget widget_feature  !border-none">
                  <h4 className="widget-title">Course Features</h4>
                  <ul>
                    <li>
                      <i className="fa fa-user"></i>
                      <span>Enrolled :</span> {course.limitMember}
                    </li>

                    <li>
                      <i className="fa fa-clipboard"></i>
                      <span>Lectures :</span> {course.tutorName}
                    </li>
                    <li>
                      <i className="fa fa-clone"></i>
                      <span>Subject:</span> {course.subjectName}
                    </li>
                    <li>
                      <i className="fa fa-tags"></i>
                      <span>Level:</span> {course.levelName}
                    </li>
                  </ul>
                  <div className="price-wrap text-center">
                    <h5>
                      Price:<span>{course.coin} coin</span>
                    </h5>
                    <form onSubmit={handleBuyCourse}>
                      <button className="btn btn-base btn-radius" type="submit">
                        ENROLL COURSE
                      </button>
                      <ToastContainer />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center pd-top-100">
            {course3 && course3.length > 0 ? (
              course3.map((course) => (
                <div className="col-lg-4 col-md-6" key={course.id}>
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
                            src={tutorAvatar || "assets/img/author/1.png"}
                            alt={`${course.tutorName}'s avatar`}
                          />
                          <span className="align-self-center !text-xl !font-bold">
                            {course.tutorName}
                          </span>
                          <span className="!ml-10 tutor-info !text-xl !font-bold !text-red-200">
                            {course.subjectName}
                          </span>
                        </div>
                      </div>
                      <div className="emt-course-meta">
                        <div className="row">
                          <div className="col-6">
                            <div className="rating">
                              <i className="fa fa-star"></i>
                              {calculateAverageRating()}
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
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
