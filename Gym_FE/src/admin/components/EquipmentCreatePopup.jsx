import React, { useState } from 'react';

const EquipmentCreatePopup = ({ reset }) => {
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        equipmentName: '',
        quantity: '',
        purchaseDate: '',
        warrantyDate: '',
        origin: '',
        status: ''
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
        const response = await fetch('http://localhost:8080/equipment', {
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
                                <h1 className="modal-title fs-5">Add Equipment</h1>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Equipment Name</label>
                                        <input type="text" name="equipmentName" className="form-control" value={formData.equipmentName} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Quantity</label>
                                        <input type="number" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Purchase Date</label>
                                        <input type="date" name="purchaseDate" className="form-control" value={formData.purchaseDate} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Warranty Date</label>
                                        <input type="date" name="warrantyDate" className="form-control" value={formData.warrantyDate} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Origin</label>
                                        <input type="text" name="origin" className="form-control" value={formData.origin} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <input type="text" name="status" className="form-control" value={formData.status} onChange={handleChange} required />
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

export default EquipmentCreatePopup;
