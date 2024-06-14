import React, { useEffect, useState } from 'react';
import "../UserProfile/user.css";
import { getUserProfile } from '../../service/UserProfileService';

const UserProfileDetail = () => {
    const [userProfile, setUserProfile] = useState({
        avatar: "",
        createdDate: "",
        dob: "",
        email: "",
        fullName: "",
        gender: "",
    });

    useEffect(() => {
        const getRequestCategories = async () => {
          const response = await getUserProfile();
          console.log('API response:', response);
          setUserProfile(response.data.data);
        };
        getRequestCategories();
    }, []);

    return (
        <div>
            <div class="col-xl-8">
                <div class="card mb-4">
                    <div class="card-header">Account Details</div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="small mb-1" for="inputUsername">Username (how your name will appear to other users on the site)</label>
                                <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" value={userProfile.fullName} />
                            </div>

                            <div class="row gx-3 mb-3">
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputFirstName">First name</label>
                                    <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value={userProfile.fullName.split(' ')[0]} />
                                </div>
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputLastName">Last name</label>
                                    <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value={userProfile.fullName.split(' ').slice(-1).join(' ')} />
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="small mb-1" for="inputEmailAddress">Email address</label>
                                <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={userProfile.email} />
                            </div>

                            <div class="row gx-3 mb-3">
                                <div class="col-md-6">
                                    <label class="small mb-1" for="inputBirthday">Birthday</label>
                                    <input class="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value={new Date(userProfile.dob).toLocaleDateString()} />
                                </div>
                            </div>
                            
                            <button class="btn btn-primary" type="button">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileDetail;
