import React, { useState, useEffect } from 'react';
import { axiosClient } from '../../axios/AxiosClient';

const TutorList = () => {
  const [page, setPage] = useState(1);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axiosClient.get(`/Tutors/get-all-tutors-for-student?page=${page}`);
        console.log(response);
        if (response.data.success) {
          setTutors(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };

    fetchTutors();
  }, [page]);

  return (
    <div>
      <div className="breadcrumb-area bg-overlay" style={{backgroundImage: "url('assets/img/bg/3.png')"}}>
        <div className="container">
          <div className="breadcrumb-inner">
            <div className="section-title mb-0 text-center">
              <h2 className="page-title">Instructor</h2>
              <ul className="page-list">
                <li><a href="index.html">Home</a></li>
                <li>Instructor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
   
      <div className="team-area pd-top-120 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            {tutors.map((tutor, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="single-team-inner">
                  <div className="thumb">
                    <img src={tutor.avatar} alt={tutor.tutorName} />
                    <div className="social-wrap">
                      <div className="social-wrap-inner">
                        <a className="social-share" href="#"><i className="fa fa-share-alt"></i></a>
                        <ul>
                          <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                          <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                          <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
                          <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="details">
                    <h4><a href="#">{tutor.tutorName}</a></h4>
                    <span>{tutor.degree}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    
      <div className="counter-area bg-gray">
        <div className="container">
          <div className="counter-area-inner pd-top-110 pd-bottom-120" style={{backgroundImage: "url('assets/img/other/1.png')"}}>
            <div className="row">
              <div className="col-lg-8 mb-5 mb-lg-0">
                <div className="section-title mb-0">
                  <h6 className="sub-title right-line">Funfact</h6>
                  <h2 className="title">Strength in Numbers</h2>
                  <p className="content pb-3">The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy</p>
                  <div className="btn-counter bg-base mt-4">
                    <h3 className="left-val align-self-center"><span className="counter">2.4</span>k+</h3>
                    <div className="right-val align-self-center">
                      Successful <br/> students
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 align-self-center">
                <ul className="single-list-wrap">
                  <li className="single-list-inner style-box-bg">
                    <div className="media">
                      <div className="media-left">
                        <img src="assets/img/icon/1.png" alt="img"/>
                      </div>
                      <div className="media-body align-self-center">
                        <h5><span className="counter">1200</span>+</h5>
                        <p>Learners & counting</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list-inner style-box-bg">
                    <div className="media">
                      <div className="media-left">
                        <img src="assets/img/icon/2.png" alt="img"/>
                      </div>
                      <div className="media-body align-self-center">
                        <h5><span className="counter">320</span>+</h5>
                        <p>Total courses</p>
                      </div>
                    </div>
                  </li>
                  <li className="single-list-inner style-box-bg">
                    <div className="media">
                      <div className="media-left">
                        <img src="assets/img/icon/3.png" alt="img"/>
                      </div>
                      <div className="media-body align-self-center">
                        <h5><span className="counter">1340</span>+</h5>
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
   
      <div className="testimonial-area pd-top-110 pd-bottom-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7">
              <div className="section-title text-center">
                <h6 className="sub-title double-line">Client Testimonials</h6>
                <h2 className="title">What our clients say</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="single-testimonial-inner m-0">
                <div className="media testimonial-author mb-4">
                  <div className="media-left">
                    <img src="assets/img/author/1.png" alt="img"/>
                    <i className="fa fa-quote-left"></i>
                  </div>
                  <div className="media-body align-self-center">
                    <h6>Eugene Freeman</h6>
                    <p>Tincidunt</p>
                  </div>
                </div>
                <span className="testimonial-quote"><i className="fa fa-quote-left"></i></span>
                <p className="mb-0">Lorem ipsum dolor sit amet, elitr, sed diam volu sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="single-testimonial-inner m-0">
                <div className="media testimonial-author mb-4">
                  <div className="media-left">
                    <img src="assets/img/author/2.png" alt="img"/>
                    <i className="fa fa-quote-left"></i>
                  </div>
                  <div className="media-body align-self-center">
                    <h6>Freeman Ugene</h6>
                    <p>Tincidunt</p>
                  </div>
                </div>
                <span className="testimonial-quote"><i className="fa fa-quote-left"></i></span>
                <p className="mb-0">Lorem ipsum dolor sit amet, elitr, sed diam volu sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorList;
