
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { getIdUserByToken } from '../../utils/JWTService';
import { get1User, updateProfile } from '../../service/UserService';


const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // State để lưu thông tin người dùng
    const [editMode, setEditMode] = useState(false); // State để xác định chế độ chỉnh sửa

    // Các state mới cho các trường thông tin người dùng
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('1');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [birth, setBirth] = useState(null);

    useEffect(() => {
        // Gọi hàm lấy thông tin người dùng khi component được render
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            // Gọi hàm lấy thông tin người dùng với idUser cụ thể (123 là ví dụ)
            
            const userData = await get1User(getIdUserByToken()); // Thay 123 bằng idUser của người dùng của bạn
            setUser(userData);
            // Cập nhật các state mới với thông tin của người dùng
            setName(userData.name);
            setLastName(userData.lastName);
            setPhoneNumber(userData.phoneNumber);
            setAddress(userData.address);
            setGender(userData.gender);
            setEmail(userData.email);
            setUserName(userData.username);
            setBirth(userData.dateOfBirth);
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Xử lý lỗi khi gọi API không thành công
        }
    };

    const handleEdit = () => {
        setEditMode(true); // Chuyển sang chế độ chỉnh sửa
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Đặt lại editMode về false sau khi đã cập nhật thành công
        setEditMode(false);
   
    
        try {
            // Gọi hàm updateProfile để gửi yêu cầu cập nhật thông tin người dùng
            
            const response = await updateProfile(userName,email,name,birth,20,"");
            // Xử lý kết quả trả về từ API (response) nếu cần
            console.log('Update profile success:', response);
            setEditMode(false); // Chuyển về chế độ xem thông tin sau khi cập nhật thành công
        } catch (error) {
            console.error('Error updating profile:', error);
            // Xử lý lỗi khi gọi API không thành công
        }
    };

    return (
        <div className="container emp-profile">
            <form method="post" onSubmit={handleSubmit}>
                {user && (
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={user.avatar} alt="User Avatar" style={{maxHeight: "250px"}} />
                                {editMode && (
                                    <div className="file btn btn-lg btn-primary">
                                        Change Photo
                                        <input type="file" name="file" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{user.username}</h5>
                                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 ">
                            {editMode ? (
                                <div className='d-flex'>
                                    <input type="submit" className="btn btn-success " value="Save" />
                                    <button type="button" className=" btn btn-secondary " onClick={() => setEditMode(false)}>Cancel</button>
                                </div>
                            ) : (
                                <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit Profile</button>
                            )}
                        </div>
                    </div>
                )}
                {user && (
                    <div className="row">
                        <div className="col-md-4">
                            {/* <div className="profile-work">
                                <p>SKILLS</p>
                                <div></div>
                                <ul>
                                {user.skillsList && user.skillsList.map((skill, index) => (
                                    <li>
                                    <a key={index} href="#">{skill}</a><br/></li>
                                ))}</ul>
                            </div> */}
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="name" className="form-label"> Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            {editMode ? (
                                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                            ) : (
                                                <p>{name}</p>
                                            )}
                                        </div>
                                    </div>
                                   
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="birth" className="form-label">Date of Birth</label>
                                        </div>
                                        <div className="col-md-6">
                                        {editMode ? (
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="birth"
                                            value={birth ? birth.toISOString().split('T')[0] : ''}
                                            onChange={(e) => setBirth(new Date(e.target.value))}
                                        />
                                    ) : (
                                        <p>{birth instanceof Date && !isNaN(birth.getTime()) ? birth.toDateString() : ''}</p>
                                    )}
                                        </div>
                                    </div>
                                    {/* <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                        </div>
                                        <div className="col-md-6">
                                            {editMode ? (
                                                <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                            ) : (
                                                <p>{phoneNumber}</p>
                                            )}
                                        </div>
                                    </div> */}
                                    {/* <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="address" className="form-label">Address</label>
                                        </div>
                                        <div className="col-md-6">
                                            {editMode ? (
                                                <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                            ) : (
                                                <p>{address}</p>
                                            )}
                                        </div>
                                    </div> */}
                                    {/* <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="gender" className="form-label">Gender</label>
                                        </div>
                                        <div className="col-md-6">
                                            {editMode ? (
                                                <select className="form-control" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                                    <option value="1">Male</option>
                                                    <option value="2">Female</option>
                                                </select>
                                            ) : (
                                                <p>{gender === '1' ? 'Male' : 'Female'}</p>
                                            )}
                                        </div>
                                    </div> */}
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="email" className="form-label">Email</label>
                                        </div>
                                        <div className="col-md-6">
                                           
                                                <p>{email}</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Profile;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
  
//     const navigate = useNavigate();
//     const handleSubmit = () => {
       

      
//     }
//     return (
//        <div><div className="container emp-profile">
//        <form method="post" onSubmit={handleSubmit}>
//            <div className="row">
//                <div className="col-md-4">
//                    <div className="profile-img">
//                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
//                        <div className="file btn btn-lg btn-primary">
//                            Change Photo
//                            <input type="file" name="file"/>
//                        </div>
//                    </div>
//                </div>
//                <div className="col-md-6">
//                    <div className="profile-head">
//                                <h5>
//                                    Kshiti Ghelani
//                                </h5>
//                                <h6>
//                                    Web Developer and Designer
//                                </h6>
//                                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
//                        <ul className="nav nav-tabs" id="myTab" role="tablist">
//                            <li className="nav-item">
//                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
//                            </li>
//                            <li className="nav-item">
//                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
//                            </li>
//                        </ul>
//                    </div>
//                </div>
//                <div className="col-md-2">
//                    <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
//                </div>
//            </div>
//            <div className="row">
//                <div className="col-md-4">
//                    <div className="profile-work">
//                        <p>WORK LINK</p>
//                        <a href="">Website Link</a><br/>
//                        <a href="">Bootsnipp Profile</a><br/>
//                        <a href="">Bootply Profile</a>
//                        <p>SKILLS</p>
//                        <a href="">Web Designer</a><br/>
//                        <a href="">Web Developer</a><br/>
//                        <a href="">WordPress</a><br/>
//                        <a href="">WooCommerce</a><br/>
//                        <a href="">PHP, .Net</a><br/>
//                    </div>
//                </div>
//                <div className="col-md-8">
//                    <div className="tab-content profile-tab" id="myTabContent">
//                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>User Id</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>Kshiti123</p>
//                                        </div>
//                                    </div>
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>Name</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>Kshiti Ghelani</p>
//                                        </div>
//                                    </div>
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>Email</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>kshitighelani@gmail.com</p>
//                                        </div>
//                                    </div>
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>Phone</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>123 456 7890</p>
//                                        </div>
//                                    </div>
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>Profession</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>Web Developer and Designer</p>
//                                        </div>
//                                    </div>
//                        </div>
//                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>Experience</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>Expert</p>
//                                        </div>
//                                    </div>
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>Hourly Rate</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>10$/hr</p>
//                                        </div>
//                                    </div>
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>Total Projects</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>230</p>
//                                        </div>
//                                    </div>
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>English Level</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>Expert</p>
//                                        </div>
//                                    </div>
//                                    <div className="row">
//                                        <div className="col-md-6">
//                                            <label>Availability</label>
//                                        </div>
//                                        <div className="col-md-6">
//                                            <p>6 months</p>
//                                        </div>
//                                    </div>
//                            <div className="row">
//                                <div className="col-md-12">
//                                    <label>Your Bio</label><br/>
//                                    <p>Your detail description</p>
//                                </div>
//                            </div>
//                        </div>
//                    </div>
//                </div>
//            </div>
//        </form>           
//    </div></div>
//     );
// }

// export default Profile;