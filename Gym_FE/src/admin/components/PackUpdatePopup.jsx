import React, { useState, useEffect } from 'react';
// import { get1Pack, updatePack } from '../../../service/PackService';
import { getPacktById } from '../../service/PackService';

const PackUpdatePopup = ({ packId, reset }) => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    packName: '',
    duration: '',
    packInfo: '',
    image: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      fetchPackData();
    }
  }, [show]);

  const fetchPackData = async () => {
    try {
      const packData = await getPacktById(packId);
      setFormData({
        packName: packData.packName,
        duration: packData.duration,
        packInfo: packData.packInfo,
        image: packData.image,
      });
    } catch (error) {
      console.error('Error fetching pack data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:8080/pack/${packId}`, {
            method: 'PATCH',
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
      setShow(false);
      reset();
    } catch (error) {
      console.error('Error updating pack:', error);
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
                <h1 className="modal-title fs-5">Cập Nhật Gói Tập</h1>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
             
                <div className="modal-body"> <form onSubmit={handleUpdate}>
                  <div className="mb-2">
                    <label className="form-label">Pack Name</label>
                    <input type="text" name="packName" className="form-control" value={formData.packName} onChange={handleChange} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Duration (months)</label>
                    <input type="number" name="duration" className="form-control" value={formData.duration} onChange={handleChange} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Pack Info</label>
                    <input type="text" name="packInfo" className="form-control" value={formData.packInfo} onChange={handleChange} />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Image URL</label>
                    <input type="text" name="image" className="form-control" value={formData.image} onChange={handleChange} />
                  </div>
                </form></div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackUpdatePopup;
