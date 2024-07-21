import React, { useState } from 'react';
import "../TutorPage/user.css";
import { postTutorRegister } from '../../service/TutorService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

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
        imageUrl: "",
    });

    const [degreeFile, setDegreeFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDataChange = (key, value) => {
        setTutorRegister({ ...tutorRegister, [key]: value });
    };

    const handleFileChange = (e, fileType) => {
        if (fileType === 'degree') {
            setDegreeFile(e.target.files[0]);
        } else if (fileType === 'video') {
            setVideoFile(e.target.files[0]);
        } else if (fileType === 'image') {
            setImageFile(e.target.files[0]);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let degreeUrl = "";
            let videoUrl = "";
            let imageUrl = "";

            if (degreeFile) {
                const degreeRef = ref(storage, `degrees/${degreeFile.name}`);
                await uploadBytes(degreeRef, degreeFile);
                degreeUrl = await getDownloadURL(degreeRef);
            }

            if (videoFile) {
                if (videoFile.size > 100 * 1024 * 1024) {
                    toast.error("Video file size should be less than 100MB");
                    setLoading(false);
                    return;
                }
                const videoRef = ref(storage, `videos/${videoFile.name}`);
                await uploadBytes(videoRef, videoFile);
                videoUrl = await getDownloadURL(videoRef);
            }

            if (imageFile) {
                const imageRef = ref(storage, `images/${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            const updatedTutorRegister = {
                ...tutorRegister,
                degree: degreeUrl,
                tutorServiceVideo: videoUrl,
                imageUrl: imageUrl,
            };

            const response = await postTutorRegister(updatedTutorRegister);
            console.log(response);

            if (response.err) {
                toast.error("One or more validation errors occurred.");
            } else {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error("An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="col-xl-8">
                <div className="card mb-4">
                    <div className="card-header">Account Details</div>
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputUsername">Academic Level</label>
                                <input 
                                    className="form-control" 
                                    id="inputUsername" 
                                    type="text" 
                                    placeholder="Enter your academic level" 
                                    onChange={(e) => handleDataChange("academicLevel", e.target.value)} 
                                />
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputWorkPlace">Work Place</label>
                                    <input 
                                        className="form-control" 
                                        id="inputWorkPlace" 
                                        type="text" 
                                        placeholder="Enter your work place" 
                                        onChange={(e) => handleDataChange("workPlace", e.target.value)} 
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputDegree">Degree (PDF)</label>
                                    <input 
                                        className="form-control" 
                                        id="inputDegree" 
                                        type="file" 
                                        accept=".pdf" 
                                        onChange={(e) => handleFileChange(e, 'degree')} 
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputCreditCard">Credit Card</label>
                                <input 
                                    className="form-control" 
                                    id="inputCreditCard" 
                                    type="text" 
                                    placeholder="Enter your credit card" 
                                    onChange={(e) => handleDataChange("creditCard", e.target.value)} 
                                />
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputServiceName">Tutor Service Name</label>
                                    <input 
                                        className="form-control" 
                                        id="inputServiceName" 
                                        type="text" 
                                        placeholder="Enter your tutor service name" 
                                        onChange={(e) => handleDataChange("tutorServiceName", e.target.value)} 
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputServiceDescription">Tutor Service Description</label>
                                    <input 
                                        className="form-control" 
                                        id="inputServiceDescription" 
                                        type="text" 
                                        placeholder="Enter your tutor service description" 
                                        onChange={(e) => handleDataChange("tutorServiceDescription", e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputVideo">Tutor Service Video (max 100MB)</label>
                                <input 
                                    className="form-control" 
                                    id="inputVideo" 
                                    type="file" 
                                    accept="video/*" 
                                    onChange={(e) => handleFileChange(e, 'video')} 
                                />
                            </div>

                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputLearningMaterial">Learning Material Demo</label>
                                <input 
                                    className="form-control" 
                                    id="inputLearningMaterial" 
                                    type="text" 
                                    placeholder="Upload your learning material demo" 
                                    onChange={(e) => handleDataChange("learningMaterialDemo", e.target.value)} 
                                />
                            </div>

                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputImage">Profile Image</label>
                                <input 
                                    className="form-control" 
                                    id="inputImage" 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => handleFileChange(e, 'image')} 
                                />
                            </div>
                            
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save changes"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default TutorRegister;