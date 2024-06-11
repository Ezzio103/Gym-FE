import React, { useState } from 'react';

const CreatePopup = ({reset}) => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
    birthday: '',
    email: '',
    isActivated: false,
    name: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  const handleSubmit = async (e) => {

    
    const response = await fetch('http://localhost:8080/users/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            }
        )
        if (response.ok) {
            handleClose();
            // alert("Thêm thành công!");
            
            
        } else {
            handleClose();
            // alert("Gặp lỗi trong quá trình thêm!");
        }
        
    // e.preventDefault();
    console.log(formData)
    reset();
    // setReset();
    // addUser(formData);
    // handleClose();
  };

  return (
    <>
      <div className="col-1 btn btn-primary" style={{ marginLeft: '12px' }} onClick={handleShow}>
        <i className="fa-solid fa-plus"></i>
      </div>
      {show && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Thêm Người Dùng</h1>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
             
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tuổi</label>
                    <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ngày sinh</label>
                    <input type="date" name="dob" className="form-control" value={formData.birthday} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Đã kích hoạt</label>
                    <input type="checkbox" name="isActive" className="form-check-input" checked={formData.isActivated} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tên</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                  </div>
                
                
                </div>
                <div className="modal-footer">
                <div>
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                  </div>
                </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePopup;
