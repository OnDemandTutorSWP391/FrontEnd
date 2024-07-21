import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRequestCategory, postCreateRequest } from '../../service/RequestService';
import { ToastContainer } from 'react-toastify';

const CreateRequest = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    requestCategoryId: "",
    description: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [nameToIdMap, setNameToIdMap] = useState({});

  const handleDataChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    const categoryId = nameToIdMap[selectedCategoryName];
    setSelectedCategory(selectedCategoryName);
    handleDataChange("requestCategoryId", categoryId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postCreateRequest(formData);
  };

  useEffect(() => {
    const getRequestCategories = async () => {
      const response = await getAllRequestCategory();
      console.log('API response:', response);
      const categoriesData = response.data.data;
      setCategories(categoriesData);

      // Create a mapping of category name to category ID
      const categoryNameToIdMap = categoriesData.reduce((acc, category) => {
        acc[category.categoryName] = category.id;
        return acc;
      }, {});
      setNameToIdMap(categoryNameToIdMap);
    };
    getRequestCategories();
  }, []);

  return (
    <div>
      <div className="breadcrumb-area bg-overlay" style={{ backgroundColor: "#143254" }}>
        <div className="container">
          <div className="breadcrumb-inner">
            <div className="section-title mb-0 text-center">
              <h2 className="page-title">Contact</h2>
              <ul className="page-list">
                <li><a href="index.html">Home</a></li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-list pd-top-120 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="contact-list-inner">
                <div className="media">
                  <div className="media-left">
                    <img src="/public/img/icon/17.png" alt="img" />
                  </div>
                  <div className="media-body align-self-center">
                    <h5>Our Phone</h5>
                    <p>000 2324 39493</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-list-inner">
                <div className="media">
                  <div className="media-left">
                    <img src="/public/img/icon/18.png" alt="img" />
                  </div>
                  <div className="media-body align-self-center">
                    <h5>Our Email</h5>
                    <p>name@website.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-list-inner">
                <div className="media">
                  <div className="media-left">
                    <img src="/public/img/icon/16.png" alt="img" />
                  </div>
                  <div className="media-body align-self-center">
                    <h5>Our Address</h5>
                    <p>2 St, Loskia, amukara.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="counter-area pd-bottom-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="section-title mb-0">
                <h6 className="sub-title right-line">Get in touch</h6>
                <h2 className="title">Write Us a Message</h2>
                <p className="content pb-3">The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, </p>
                <ul className="social-media style-base pt-3">
                  <li>
                    <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 mt-5 mt-lg-0">
              <form className="contact-form-inner mt-5 mt-md-0" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="single-input-inner style-bg-border">
                      <select onChange={handleCategoryChange}>
                        <option>Choose Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.categoryName}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner style-bg-border">
                      <textarea placeholder="Description" onChange={(e) => handleDataChange("description", e.target.value)}></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-base" type='submit'>Send Message</button>
                    <ToastContainer />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;