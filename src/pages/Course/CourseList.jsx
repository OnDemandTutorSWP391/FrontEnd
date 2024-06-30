import React, { useState, useEffect } from 'react';
import { getAllCourse } from '../../service/CourseService';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourse();
        console.log(response);
        if (response.data && response.data.data) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

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
                          <img src={course.url} alt="course img" />
                        </div>
                        <div className="details">
                          <div className="details-inner">
                            <div className="emt-user">
                              <span className="u-thumb"><img src="assets/img/author/1.png" alt="author img" /></span>
                              <span className="align-self-center">{course.tutorName}</span>
                            </div>
                            <h6>
                              <Link to={`/course-detail/${course.id}`}>{course.subjectName}</Link>
                            </h6>
                            <p>{course.description}</p>
                          </div>
                          <div className="emt-course-meta">
                            <div className="row">
                              <div className="col-6">
                                <div className="rating">
                                  <i className="fa fa-star"></i> 4.3
                                  <span>(23)</span>
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
                  <h4 className="widget-title">Catagory</h4>
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
                    <input type="checkbox" checked="checked" />
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
                    <input type="checkbox" checked="checked" />
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
