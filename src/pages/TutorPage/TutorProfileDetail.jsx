import React, { useEffect, useState } from 'react';
import "../TutorPage/user.css";
import { getUserProfile } from '../../service/UserProfileService';
import { storage } from '../../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateUserProfile } from '../../service/AccountService';
const TutorProfileDetail = () => {
    const [userProfile, setUserProfile] = useState({
        avatar: "",
        createdDate: "",
        dob: "",
        email: "",
        fullName: "",
        gender: "",
    });
    const [formDataUpdate, setDataUpdate] = useState({
        fullName: "",
        dob: "",
        gender: "",
        avatar: "",
    });
    const [avatarFile, setAvatarFile] = useState(null); // State for handling avatar file

    const handleDataChange = (key, value) => {
        setDataUpdate({ ...formDataUpdate, [key]: value });
    };

    const handleFileChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const handleSaveChanges = async () => {
        try {
            let avatarUrl = userProfile.avatar;
            if (avatarFile) {
                const avatarRef = ref(storage, `avatars/${avatarFile.name}`);
                await uploadBytes(avatarRef, avatarFile);
                avatarUrl = await getDownloadURL(avatarRef);
            }

            const updatedData = {
                ...formDataUpdate,
                avatar: avatarUrl,
                dob: new Date(formDataUpdate.dob).toISOString()
            };

            await updateUserProfile(updatedData); // Call the API to update user profile
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    useEffect(() => {
        const getRequestCategories = async () => {
            const response = await getUserProfile();
            setUserProfile(response.data.data);
            setDataUpdate({
                fullName: response.data.data.fullName,
                dob: response.data.data.dob,
                gender: response.data.data.gender,
                avatar: response.data.data.avatar,
            });
        };
        getRequestCategories();
    }, []);

    return (
        <div>
            <div className="col-xl-8">
                <div className="card mb-4">
                    <div className="card-header">Account Details</div>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                                <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" 
                                    value={formDataUpdate.fullName} 
                                    onChange={(e) => handleDataChange("fullName", e.target.value)}
                                />
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                    <input className="form-control" id="inputFirstName" type="text" 
                                        placeholder="Enter your first name" 
                                        value={formDataUpdate.fullName.split(' ')[0]} 
                                        onChange={(e) => handleDataChange("fullName", `${e.target.value} ${formDataUpdate.fullName.split(' ').slice(1).join(' ')}`)}
                                    />
                                </div>
                                
                            </div>

                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={userProfile.email} disabled/>
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                                    <input className="form-control" id="inputBirthday" type="date" name="birthday" 
                                        placeholder="Enter your birthday" 
                                        value={formDataUpdate.dob} 
                                        onChange={(e) => handleDataChange("dob", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputGender">Gender</label>
                                <input className="form-control" id="inputGender" type="text" 
                                    placeholder="Enter your gender" 
                                    value={formDataUpdate.gender} 
                                    onChange={(e) => handleDataChange("gender", e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputAvatar">Avatar</label>
                                <input className="form-control" id="inputAvatar" type="file" onChange={handleFileChange} />
                            </div>

                            <button className="btn btn-primary" type="button" onClick={handleSaveChanges}>Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorProfileDetail;
