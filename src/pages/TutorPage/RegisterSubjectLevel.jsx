import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosClient } from '../../axios/AxiosClient';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const RegisterSubjectLevel = () => {
    const [subjectLevel, setSubjectLevel] = useState({
        levelId: 0,
        subjectId: 0,
        tutorId: 0,
        name: "",
        description: "",
        url: "",
        coin: 0,
        limitMember: 5,
        image: null
    });
    const [levels, setLevels] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchLevels();
        fetchSubjects();
    }, []);

    const fetchLevels = async () => {
        try {
            const response = await axiosClient.get('/Levels/get-all');
            if (response.data && response.data.success && Array.isArray(response.data.data)) {
                setLevels(response.data.data);
            } else {
                console.error('Levels data is not as expected:', response);
                setLevels([]);
            }
        } catch (error) {
            console.error("Error fetching levels:", error);
            toast.error("Error fetching levels");
            setLevels([]);
        }
    };
    
    const fetchSubjects = async () => {
        try {
            const response = await axiosClient.get('/Subjects/get-all');
            if (response.data && response.data.success && Array.isArray(response.data.data)) {
                setSubjects(response.data.data);
            } else {
                console.error('Subjects data is not as expected:', response);
                setSubjects([]);
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
            toast.error("Error fetching subjects");
            setSubjects([]);
        }
    };

    const handleDataChange = (key, value) => {
        setSubjectLevel({ ...subjectLevel, [key]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = "";
            if (imageFile) {
                const imageRef = ref(storage, `subject-levels/${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            const subjectLevelData = {
                ...subjectLevel,
                image: imageUrl
            };

            const response = await axiosClient.post('/SubjectLevels/register-subject-level', subjectLevelData);
            if (response.data && response.data.success) {
                toast.success(response.data.message || "Subject level registered successfully!");
            } else {
                toast.error(response.data.message || "Failed to register subject level");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while registering the subject level");
        }
    };

    return (
        <div className="col-xl-8">
            <div className="card mb-4">
                <div className="card-header">Register Subject Level</div>
                <div className="card-body">
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="levelId">Level</label>
                            <select 
                                className="form-control" 
                                id="levelId" 
                                value={subjectLevel.levelId} 
                                onChange={(e) => handleDataChange("levelId", parseInt(e.target.value))} 
                                required
                            >
                                <option value="">Select a level</option>
                                {levels.map(level => (
                                    <option key={level.id} value={level.id}>{level.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="subjectId">Subject</label>
                            <select 
                                className="form-control" 
                                id="subjectId" 
                                value={subjectLevel.subjectId} 
                                onChange={(e) => handleDataChange("subjectId", parseInt(e.target.value))} 
                                required
                            >
                                <option value="">Select a subject</option>
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="tutorId">Tutor ID</label>
                            <input 
                                className="form-control" 
                                id="tutorId" 
                                type="number" 
                                value={subjectLevel.tutorId} 
                                onChange={(e) => handleDataChange("tutorId", parseInt(e.target.value))} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="name">Name</label>
                            <input 
                                className="form-control" 
                                id="name" 
                                type="text" 
                                value={subjectLevel.name} 
                                onChange={(e) => handleDataChange("name", e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="description">Description</label>
                            <textarea 
                                className="form-control" 
                                id="description" 
                                value={subjectLevel.description} 
                                onChange={(e) => handleDataChange("description", e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="url">URL</label>
                            <input 
                                className="form-control" 
                                id="url" 
                                type="url" 
                                value={subjectLevel.url} 
                                onChange={(e) => handleDataChange("url", e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="coin">Coin</label>
                            <input 
                                className="form-control" 
                                id="coin" 
                                type="number" 
                                value={subjectLevel.coin} 
                                onChange={(e) => handleDataChange("coin", parseInt(e.target.value))} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="limitMember">Limit Member</label>
                            <input 
                                className="form-control" 
                                id="limitMember" 
                                type="number" 
                                value={subjectLevel.limitMember} 
                                onChange={(e) => handleDataChange("limitMember", parseInt(e.target.value))} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="image">Image</label>
                            <input 
                                className="form-control" 
                                id="image" 
                                type="file" 
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>

                        <button className="btn btn-primary" type="submit">Register Subject Level</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterSubjectLevel;