import React, { useState, useEffect } from 'react';
import { getAllCourse } from '../../service/CourseService';
import { Link } from 'react-router-dom';
import { axiosClient } from '../../axios/AxiosClient';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [tutorInfo, setTutorInfo] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourse();
        console.log('Courses response:', response);
        if (response.data && response.data.data) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchTutors = async () => {
      if (courses.length > 0) {
        try {
          // Lấy danh sách tên tutor duy nhất
          const uniqueTutorNames = [...new Set(courses.map(course => course.tutorName))];
          
          // Tạo một object để lưu trữ thông tin tutor
          let tutorInfoMap = {};

          // Gọi API cho từng tên tutor
          for (const tutorName of uniqueTutorNames) {
            const response = await axiosClient.get(`/Tutors/get-all-tutors-for-student?search=${tutorName}`);
            console.log(`Response for ${tutorName}:`, response);
            
            if (response.data.success && response.data.data.length > 0) {
              // Giả sử API trả về một mảng, chúng ta lấy phần tử đầu tiên
              tutorInfoMap[tutorName] = response.data.data[0];
            }
          }

          setTutorInfo(tutorInfoMap);
        } catch (error) {
          console.error('Error fetching tutors:', error);
        }
      }
    };

    fetchTutors();
  }, [courses]);

  return (
    <div>
      <div className="breadcrumb-area bg-overlay" style={{ backgroundImage: 'url("assets/img/bg/3.png")' }}>
        <div className="container">
          <div className="breadcrumb-inner">
            <div className="section-title mb-0 text-center">
              <h2 className="page-title">Courses</h2>
              <ul className="page-list">
                <li><a href="index.html">Home</a></li>
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
                  courses.map(course => (
                    <div className="col-md-6" key={course.id}>
                      <div className="single-course-inner">
                        <div className="thumb">
                          <img src={course.image} alt="course img" />
                        </div>
                        <div className="details">
                          <div className="details-inner">
                            <div className="emt-user">
                              <span className="u-thumb">
                                <img 
                                  src={tutorInfo[course.tutorName]?.avatar} 
                                  alt={`${course.tutorName}'s avatar`} 
                                />
                              </span>
                              <span className="align-self-center">{course.tutorName}</span>
                              <span className="tutor-info">
                                {tutorInfo[course.tutorName]?.workPlace}
                              </span>
                            </div>
                            <h6>
                              <Link to={`/course-detail/${course.id}`}>{course.subjectName}</Link>
                            </h6>
                            {/* <p>{course.description}</p> */}
                          </div>
                          <div className="emt-course-meta">
                            <div className="row">
                              <div className="col-6">
                                <div className="rating">
                                  <i className="fa fa-star"></i> {tutorInfo[course.tutorName]?.averageStar || 'N/A'}
                                  <span>({tutorInfo[course.tutorName]?.totalReviews || 0})</span>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="price text-right">
                                  Price: <span>${course.coin}</span>
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
                <ul className="pagination">
                  <li className="pagination-arrow"><a href="#"><i className="fa fa-angle-double-left"></i></a></li>
                  <li><a href="#">1</a></li>
                  <li><a className="active" href="#">2</a></li>
                  <li><a href="#">...</a></li>
                  <li><a href="#">3</a></li>
                  <li className="pagination-arrow"><a href="#"><i className="fa fa-angle-double-right"></i></a></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-4 order-lg-1 col-12">
              <div className="td-sidebar mt-5 mt-lg-0">
                <div className="widget widget_search_course">
                  <h4 className="widget-title">Search</h4>
                  <form className="search-form single-input-inner">
                    <input type="text" placeholder="Search here" />
                    <button className="btn btn-base w-100 mt-3" type="submit"><i className="fa fa-search"></i> SEARCH</button>
                  </form>
                </div>
                <div className="widget widget_catagory">
                  <h4 className="widget-title">Category</h4>
                  <ul className="catagory-items">
                    <li><a href="#">Tempor lorem interdum <i className="fa fa-caret-right"></i></a></li>
                    <li><a href="#">Auctor mattis lacus <i className="fa fa-caret-right"></i></a></li>
                    <li><a href="#">Dolor proin <i className="fa fa-caret-right"></i></a></li>
                    <li><a href="#">Pharetra amet <i className="fa fa-caret-right"></i></a></li>
                  </ul>
                </div>
                <div className="widget widget_checkbox_list">
                  <h4 className="widget-title">Price</h4>
                  <label className="single-checkbox">
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                    Free Courses
                  </label>
                  <label className="single-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Paid Courses
                  </label>
                  <label className="single-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Only Subscription
                  </label>
                </div>
                <div className="widget widget_checkbox_list">
                  <h4 className="widget-title">Level</h4>
                  <label className="single-checkbox">
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                    Beginner
                  </label>
                  <label className="single-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Intermediate
                  </label>
                  <label className="single-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Advanced
                  </label>
                </div>
                <div className="widget widget_tags mb-0">
                  <h4 className="widget-title">Tags</h4>
                  <div className="tagcloud">
                    <a href="#">Art</a>
                    <a href="#">Creative</a>
                    <a href="#">Article</a>
                    <a href="#">Designer</a>
                    <a href="#">Portfolio</a>
                    <a href="#">Project</a>
                    <a href="#">Personal</a>
                    <a href="#">Landing</a>
                  </div>
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