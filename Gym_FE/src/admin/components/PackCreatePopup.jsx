import React, { useState } from 'react';

const PackCreatePopup = ({ reset }) => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    packName: '',
    duration: '',
    packInfo: '',
    image: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/pack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      handleClose();
      reset();
    } else {
      handleClose();
      console.log("lỗi phản hồi")
    }
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
                <h1 className="modal-title fs-5">Thêm Gói Tập</h1>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Pack Name</label>
                  <input type="text" name="packName" className="form-control" value={formData.packName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration (months)</label>
                  <input type="number" name="duration" className="form-control" value={formData.duration} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pack Info</label>
                  <input type="text" name="packInfo" className="form-control" value={formData.packInfo} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input type="text" name="image" className="form-control" value={formData.image} onChange={handleChange} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackCreatePopup;
