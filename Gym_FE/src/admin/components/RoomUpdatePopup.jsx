import React, { useState, useEffect } from 'react';

const RoomUpdatePopup = ({ roomId, reset }) => {
    const [show, setShow] = useState(false);
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        roomName: '',
        quantity: '',
        description: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            fetchRoomData();
        }
    }, [show]);

    const fetchRoomData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/room/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const roomData = await response.json();
            setFormData({
                roomName: roomData.roomName,
                quantity: roomData.quantity,
                description: roomData.description,
            });
        } catch (error) {
            console.error('Error fetching room data:', error);
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
            const response = await fetch(`http://localhost:8080/room/${roomId}`, {
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
            console.error('Error updating room:', error);
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
                                <h1 className="modal-title fs-5">Update Room</h1>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="modal-body">
                                    <div className="mb-2">
                                        <label className="form-label">Room Name</label>
                                        <input type="text" name="roomName" className="form-control" value={formData.roomName} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Quantity</label>
                                        <input type="number" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label">Description</label>
                                        <input type="text" name="description" className="form-control" value={formData.description} onChange={handleChange} />
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

export default RoomUpdatePopup;
