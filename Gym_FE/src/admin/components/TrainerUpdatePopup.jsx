import React, { useState, useEffect } from 'react';

const TrainerUpdatePopup = ({ trainerId, reset }) => {
    const [show, setShow] = useState(false);
    const token = localStorage.getItem("token");
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

    useEffect(() => {
        if (show) {
            fetchTrainerData();
        }
    }, [show]);

    const fetchTrainerData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/trainer/${trainerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const trainerData = await response.json();
            setFormData({
                name: trainerData.name,
                experience: trainerData.experience,
                phone: trainerData.phone,
                email: trainerData.email,
                avatar: trainerData.avatar,
                status: trainerData.status,
            });
        } catch (error) {
            console.error('Error fetching trainer data:', error);
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
            const response = await fetch(`http://localhost:8080/trainer/${trainerId}`, {
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
                console.log("Error response");
                handleClose();
            }
        } catch (error) {
            console.error('Error updating trainer:', error);
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
                                <h1 className="modal-title fs-5">Update Trainer</h1>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="modal-body">
                                    <div className="mb-2">
                                        <label className="form-label">Name</label>
                                        <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Experience</label>
                                        <input type="text" name="experience" className="form-control" value={formData.experience} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Phone</label>
                                        <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Email</label>
                                        <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Avatar</label>
                                        <input type="text" name="avatar" className="form-control" value={formData.avatar} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Status</label>
                                        <select name="status" className="form-select" value={formData.status} onChange={handleChange} required>
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TrainerUpdatePopup;
