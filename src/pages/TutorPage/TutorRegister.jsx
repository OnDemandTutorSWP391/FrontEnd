import React, { useEffect, useState } from 'react';
import "../TutorPage/user.css";
import { getUserProfile } from '../../service/UserProfileService';
import { postTutorRegister } from '../../service/TutorService';
import { ToastContainer, toast } from 'react-toastify';

const TutorRegister = () => {
    const [tutorRegister, setTutorRegister] = useState({
        academicLevel: "",
        workPlace: "",
        degree: "",
        creditCard: "",
        tutorServiceName: "",
        tutorServiceDescription: "",
        tutorServiceVideo: "",
        learningMaterialDemo: "",
    });
    const handleDataChange = (key, value) => {
        setTutorRegister({ ...tutorRegister, [key]: value });
    };
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        const response = await postTutorRegister(tutorRegister); // Use formData directly
        console.log(response);
    
        
          
        if(response.err){
            toast.error("One or more validation errors occurred.")
        }else{
            toast.success(response.data.message);

        }
          
        
        // handle response
      };
    

    return (
        <div>
            <div class="col-xl-8">
                <div class="card mb-4">
                    <div class="card-header">Account Details</div>
                    <div class="card-body">
                        <form onSubmit={handleRegister}>
                            <div class="mb-3">
                                <label class="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                                <input class="form-control" id="inputUsername" type="text" placeholder="enter your academicLevel"  onChange={(e) => handleDataChange("academicLevel", e.target.value)}/>
                            </div>

                            <div class="row gx-3 mb-3">
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputFirstName">workPlace</label>
                                    <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your workPlace"  onChange={(e) => handleDataChange("workPlace", e.target.value)}/>
                                </div>
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputLastName">degree</label>
                                    <input class="form-control" id="inputLastName" type="text" placeholder="upload your degree"  onChange={(e) => handleDataChange("degree", e.target.value)}/>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="small mb-1" for="inputEmailAddress">creditCard</label>
                                <input class="form-control" id="inputEmailAddress" type="text" placeholder="Enter your creditCard"  onChange={(e) => handleDataChange("creditCard", e.target.value)}/>
                            </div>

                            <div class="row gx-3 mb-3">
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputBirthday">tutorServiceName</label>
                                    <input class="form-control" id="inputBirthday" type="text" name="tutorServiceName" placeholder="Enter your tutorServiceName" onChange={(e) => handleDataChange("tutorServiceName", e.target.value)} />
                                </div>
                            </div>
                            <div class="row gx-3 mb-3">
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputBirthday">tutorServiceDescription</label>
                                    <input class="form-control" id="inputBirthday" type="text" name="tutorServiceDescription" placeholder="Enter your tutorServiceDescription" onChange={(e) => handleDataChange("tutorServiceDescription", e.target.value)} />
                                </div>
                            </div>
                            <div class="row gx-3 mb-3">
                                <div class="col-md-6">
                                    <label class="small mb-1" for="tutorServiceVideo">tutorServiceVideo</label>
                                    <input class="form-control" id="inputBirthday" type="text" name="tutorServiceVideo" placeholder="Enter your tutorServiceVideo" onChange={(e) => handleDataChange("tutorServiceVideo", e.target.value)}  />
                                </div>
                            </div>
                            <div class="row gx-3 mb-3">
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputBirthday">learningMaterialDemo</label>
                                    <input class="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Upload your learningMaterialDemo" onChange={(e) => handleDataChange("learningMaterialDemo", e.target.value)} />
                                </div>
                            </div>
                            
                            <button class="btn btn-primary" type="submit">Save changes</button>
                            <ToastContainer/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorRegister;
