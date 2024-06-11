import React, { useState, useEffect } from 'react';

import { get1User, updateUser } from '../../../service/UserService';
const UpdatePopup = ({ userId ,reset }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      
      
      name: '',
      age: '',
      isActivated: false,
      birthday: '',
      avatar: '',
    });
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    useEffect(() => {
      if (show) {
        fetchUserData();
      }
    }, [show]);
  
    const fetchUserData = async () => {
      try {
        const userData = await get1User(userId);
        setFormData({
          username: userData.username,
          email: userData.email,
          
          
          name: userData.name,
          age: userData.age,
          isActivated: userData.isActivated,
          birthday: userData.birthday,
          avatar: userData.avatar,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        console.log(formData)
        await updateUser(userId,formData.username,formData.email,formData.name,formData.isActivated,formData.birthday,formData.age,formData.avatar);
        setShow(false);
        reset();
        // setReset();
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    };
  
    return (
      <>
        <span className='me-2' onClick={handleShow}>
          <i className="fa-solid fa-pen-to-square me-2"></i>
        </span>
        {show && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Cập Nhật Người Dùng</h1>
                  <button type="button" className="btn-close" onClick={handleClose}></button>
                </div>
               
                  <div className="modal-body"> <form onSubmit={handleUpdate}>
                    <div className="mb-2">
                      <label className="form-label">Username</label>
                      <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Email</label>
                      <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                    </div>
                    
                    <div className="mb-2">
                      <label className="form-label">Is Activated</label>
                      <input type="checkbox" name="isActivated" className="form-check-input" checked={formData.isActivated} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Name</label>
                      <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Age</label>
                      <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Birthday</label>
                      <input type="date" name="birthday" className="form-control" value={formData.birthday ? new Date(formData.birthday).toISOString().split('T')[0] : ''} onChange={(e) => setFormData({ ...formData, birthday: new Date(e.target.value) })} />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Avatar</label>
                      <input type="text" name="avatar" className="form-control" value={formData.avatar} onChange={handleChange} />
                    </div>
                  </form></div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

export default UpdatePopup;
