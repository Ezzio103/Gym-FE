import React, { useState } from 'react';

const TrainerCreatePopup = ({ reset }) => {
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        name: '',
        experience: '',
        phone: '',
        email: '',
        avatar: '',
        status: 1
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
        const response = await fetch('http://localhost:8080/trainer', {
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
            console.log("Error response");
            handleClose();
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
                                <h1 className="modal-title fs-5">Add Trainer</h1>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Experience</label>
                                        <input type="text" name="experience" className="form-control" value={formData.experience} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Phone</label>
                                        <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Avatar</label>
                                        <input type="text" name="avatar" className="form-control" value={formData.avatar} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TrainerCreatePopup;
