import { useEffect, useState } from "react";
import "../assets/css/style.css";
import "../assets/css/vendor.css";
import "../assets/css/responsive.css";
import { getAllSubjectLevelFollowRating } from "../../service/CourseService";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getAllSubjectLevelFollowRating();
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourse();
  }, []);

  const handleClickOnRow = (id) => {
    navigate(`/course-detail/${id}`);
  };

  return (
    <div>
      <div className="banner-area banner-area-1 bg-gray">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8 order-lg-12 align-self-center">
              <div className="thumb b-animate-thumb">
                <img src="https://firebasestorage.googleapis.com/v0/b/swp391-fbb3f.appspot.com/o/Homepage%2F1.png?alt=media&token=a783e8d9-4432-4c0c-85be-6117745b721b" alt="img" />
              </div>
            </div>
            <div className="col-lg-7 order-lg-1 align-self-center">
              <div className="banner-inner text-center text-lg-left mt-5 mt-lg-0">
                <h6 className="b-animate-1 sub-title">DISCOVER RESEARCH</h6>
                <h1 className="b-animate-2 title">
                  A better learning future starts here
                </h1>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="intro-area intro-area--top">
        <div className="container">
          <div className="intro-area-inner bg-black">
            <div className="row no-gutters">
              <div className="col-lg-4 text-lg-left text-center">
                <div className="intro-title">
                  <h3>Why Choose Us? </h3>
                  <p>Our platform bring you many benefits</p>
                  {/* <ul>
                                <li><i className="fa fa-check"></i> Nullam est </li>
                                <li><i className="fa fa-check"></i> Mattis dictum nunc  </li>
                            </ul> */}
                </div>
              </div>
              <div className="col-lg-8 align-self-center">
                <ul className="row no-gutters">
                  <li className="col-md-4">
                    <div className="single-intro-inner style-white text-center">
                      <div className="thumb">
                        <img src="assets/img/intro/1.png" alt="img" />
                      </div>
                      <div className="details">
                        <h5>Expert Tutors at Your Fingertips</h5>
                        <p>Our experts are here to support you 24/7</p>
                      </div>
                    </div>
                  </li>
                  <li className="col-md-4">
                    <div className="single-intro-inner style-white text-center">
                      <div className="thumb">
                        <img src="assets/img/intro/2.png" alt="img" />
                      </div>
                      <div className="details">
                        <h5>Personalized Learning Experience</h5>
                        <p>
                          Our platform is designed to cater to your individual
                          learning style and pace
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="col-md-4">
                    <div className="single-intro-inner style-white text-center">
                      <div className="thumb">
                        <img src="assets/img/intro/3.png" alt="img" />
                      </div>
                      <div className="details">
                        <h5>Flexible Scheduling and Instant Access</h5>
                        <p>
                          You have the flexibility to learn when it suits you
                          best
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-area pd-top-140">
        <div className="container">
          <div className="about-area-inner">
            <div className="row">
              <div className="col-lg-6">
                <div className="about-thumb-wrap left-icon">
                  <div className="about-icon">
                    <img src="https://firebasestorage.googleapis.com/v0/b/swp391-fbb3f.appspot.com/o/Homepage%2Felearning-portals-cover-picture.svg?alt=media&token=51e22cc5-cecb-4665-98f7-3a90caeba225" />
                  </div>
                  <div className="bottom-content">
                    We uphold high standards of educational excellence to ensure
                    that our learners receive a valuable and rewarding
                    experience
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-inner-wrap pl-xl-4 pt-5 pt-lg-0 mt-5 mt-lg-0">
                  <div className="section-title mb-0">
                    <h6 className="sub-title right-line">ABOUT US</h6>
                    <h2 className="title">Our mission</h2>
                    <p className="content">
                      {" "}
                      Our mission is to break down barriers to education by
                      offering accessible and innovative learning solutions. We
                      strive to empower learners of all backgrounds to achieve
                      their academic and professional goals.
                    </p>
                    <ul className="single-list-wrap">
                      <li className="single-list-inner style-check-box-grid">
                        <div className="media">
                          <div className="media-left">
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="media-body">
                            <h5>Diverse Course Selection</h5>
                            <p>
                              {" "}
                              Explore a wide range of courses designed to meet
                              the needs of today's learners
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="single-list-inner style-check-box-grid">
                        <div className="media">
                          <div className="media-left">
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="media-body">
                            <h5>Flexible Learning</h5>
                            <p>
                              Enjoy the flexibility of online learning with our
                              interactive courses and resources available
                              anytime, anywhere
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="course-area pd-top-100 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10 col-md-11">
              <div className="section-title style-white text-center">
                <h2 className="title">Top Featured Courses</h2>
              </div>
            </div>
          </div>
          <div className="edmt-nav-tab style-white text-center"></div>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="tab1"
              role="tabpanel"
              aria-labelledby="tab1-tab"
            >
              <div className="row">
                {courses.map((x) => (
                  <>
                    <div className="col-lg-4 col-md-6  mt-3" key={x.id}>
                      <div
                        className="single-course-inner shadow-xl cursor-pointer"
                        onClick={() => handleClickOnRow(x.id)}
                      >
                        <div className="thumb">
                          <img
                            src={x.image}
                            className="h-40 w-96"
                            alt="course img"
                          />
                        </div>
                        <div className="details">
                          <div className="details-inner">
                            <div className="emt-user">
                              <img
                                className="w-14 h-14 rounded-full object-cover"
                                src={x.tutorAvata}
                                alt=""
                              />
                              <span className="align-self-center">
                                {x.tutorName}
                              </span>
                            </div>
                            <h6>{x.serviceName}</h6>
                          </div>
                          <div className="emt-course-meta">
                            <div className="row">
                              <div className="col-6">
                                <div className="price text-right flex">
                                  Price: <span>{x.coin} coin</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="counter-area bg-gray">
        <div className="container">
          <div
            className="counter-area-inner pd-top-120 pd-bottom-120"
            style={{ backgroundImage: "url('assets/img/other/1.png')" }}
          >
            <div className="row">
              <div className="col-lg-8 mb-5 mb-lg-0">
                <div className="section-title mb-0">
                  <h6 className="sub-title right-line">Funfact</h6>
                  <h2 className="title">Strength in Numbers</h2>
                  <p className="content pb-3">
                    The quick, brown fox jumps over a lazy dog. DJs flock by
                    when MTV ax quiz prog. Junk MTV quiz graced by fox whelps.
                    Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for
                    quick jigs vex! Fox nymphs grab quick-jived waltz. Brick
                    quiz whangs jumpy
                  </p>
                  <div className="btn-counter bg-base mt-4">
                    <h3 className="left-val align-self-center">
                      <span className="counter">2.4</span>k+
                    </h3>
                    <div className="right-val align-self-center">
                      Successful <br /> students
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 align-self-center">
                <ul className="single-list-wrap">
                  <li className="single-list-inner style-box-bg">
                    <div className="media">
                      <div className="media-left">
                        <img src="assets/img/icon/1.png" alt="img" />
                      </div>
                      <div className="media-body align-self-center">
                        <h5>
                          <span className="counter">1200</span>+
                        </h5>
                        <p>Learners & counting</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list-inner style-box-bg">
                    <div className="media">
                      <div className="media-left">
                        <img src="assets/img/icon/2.png" alt="img" />
                      </div>
                      <div className="media-body align-self-center">
                        <h5>
                          <span className="counter">320</span>+
                        </h5>
                        <p>Total courses</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list-inner style-box-bg">
                    <div className="media">
                      <div className="media-left">
                        <img src="assets/img/icon/3.png" alt="img" />
                      </div>
                      <div className="media-body align-self-center">
                        <h5>
                          <span className="counter">1340</span>+
                        </h5>
                        <p>Successful students</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="work-area pd-top-110">
        <div className="container">
          <div className="section-title">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <h6 className="sub-title right-line">What we do</h6>
                <h2 className="title">How it works?</h2>
              </div>
              {/* <div className="col-lg-6 align-self-center">
                        <p className="content mt-lg-0">The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs when MTV ax quiz</p>
                    </div> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-intro-inner style-icon-bg bg-gray text-center">
                <div className="thumb">
                  <img src="assets/img/icon/12.png" alt="img" />
                  <div className="intro-count">1</div>
                </div>
                <div className="details">
                  <h5>Sign up</h5>
                  <p>
                    Ipsum yorem dolor amet sit elit. Duis at est id leosco for
                    it
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-intro-inner style-icon-bg bg-gray text-center">
                <div className="thumb">
                  <img src="assets/img/icon/13.png" alt="img" />
                  <div className="intro-count">2</div>
                </div>
                <div className="details">
                  <h5>Select course</h5>
                  <p>
                    Ipsum yorem dolor amet sit elit. Duis at est id leosco for
                    it
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-intro-inner style-icon-bg bg-gray text-center">
                <div className="thumb">
                  <img src="assets/img/icon/14.png" alt="img" />
                  <div className="intro-count">3</div>
                </div>
                <div className="details">
                  <h5>Start Learning</h5>
                  <p>
                    Ipsum yorem dolor amet sit elit. Duis at est id leosco for
                    it
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-intro-inner style-icon-bg bg-gray text-center">
                <div className="thumb">
                  <img src="assets/img/icon/15.png" alt="img" />
                  <div className="intro-count">4</div>
                </div>
                <div className="details">
                  <h5>Get Certificate</h5>
                  <p>
                    Ipsum yorem dolor amet sit elit. Duis at est id leosco for
                    it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;
