import React, { useState, useEffect } from 'react';
import { getEquipmentById } from '../../service/EquipmentService';
// import { getEquipmentById } from '../../service/EquipmentService';

const EquipmentUpdatePopup = ({ equipmentId, reset }) => {
    const [show, setShow] = useState(false);
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        equipmentName: '',
        quantity: '',
        purchaseDate: '', 
        warrantyDate: '',
        origin: '',
        status: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            fetchEquipmentData();
        }
    }, [show]);

    const fetchEquipmentData = async () => {
        try {
            const equipmentData = await getEquipmentById(equipmentId);
            setFormData({
                equipmentName: equipmentData.equipmentName,
                quantity: equipmentData.quantity,
                purchaseDate: new Date(equipmentData.purchaseDate).toISOString().split('T')[0],
                warrantyDate: new Date(equipmentData.warrantyDate).toISOString().split('T')[0],
                origin: equipmentData.origin,
                status: equipmentData.status,
            });
        } catch (error) {
            console.error('Error fetching equipment data:', error);
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
            const response = await fetch(`http://localhost:8080/equipment/${equipmentId}`, {
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
            console.error('Error updating equipment:', error);
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
                                <h1 className="modal-title fs-5">Update Equipment</h1>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            
                                <div className="modal-body"><form onSubmit={handleUpdate}>
                                    <div className="mb-2">
                                        <label className="form-label">Equipment Name</label>
                                        <input type="text" name="equipmentName" className="form-control" value={formData.equipmentName} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Quantity</label>
                                        <input type="number" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Purchase Date</label>
                                        <input type="date" name="purchaseDate" className="form-control" value={formData.purchaseDate} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Warranty Date</label>
                                        <input type="date" name="warrantyDate" className="form-control" value={formData.warrantyDate} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Origin</label>
                                        <input type="text" name="origin" className="form-control" value={formData.origin} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Status</label>
                                        <input type="text" name="status" className="form-control" value={formData.status} onChange={handleChange} />
                                    </div>
                               </form> </div>
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

export default EquipmentUpdatePopup;
