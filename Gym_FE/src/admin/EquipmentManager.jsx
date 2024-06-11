import React, { useState, useEffect } from 'react';
// import { getAllEquipment } from '../../../service/EquipmentService'; // Assume these services are defined
// import EquipmentCreatePopup from './EquipmentCreatePopup';
// import EquipmentUpdatePopup from './EquipmentUpdatePopup';
import { GetAllEquipment } from '../service/EquipmentService';
import EquipmentUpdatePopup from './components/EquipmentUpdatePopup';
import EquipmentCreatePopup from './components/EquipmentCreatePopup';

const EquipmentManager = () => {
    const [equipments, setEquipments] = useState([]);
    const [reset, setReset] = useState(true);
    const token = localStorage.getItem("token");

    function setResetScreen() {
        setReset(!reset);
    }

    useEffect(() => {
        GetAllEquipment(1).then((response) => {
            setEquipments(response.equipments); // Adjust according to your API response
        }).catch((error) => {
            console.error(error);
        });
    }, [reset]);

    function handleDeleteEquipment(equipmentId) {
        fetch(`http://localhost:8080/equipments/delete?equipmentId=${equipmentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (response.ok) {
                setResetScreen();
                console.log("Deleted successfully");
            } else {
                console.error("Error deleting equipment");
            }
        })
        .catch((error) => {
            console.error("Error deleting equipment", error);
        });
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Equipment</h2>
            <div className='row'>
                <EquipmentCreatePopup reset={setResetScreen} />
            </div>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Equipment Id</th>
                        <th>Equipment Name</th>
                        <th>Quantity</th>
                        <th>Purchase Date</th>
                        <th>Warranty Date</th>
                        <th>Origin</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {equipments.map(equipment => (
                        <tr key={equipment.equipmentId}>
                            <td>{equipment.equipmentId}</td>
                            <td>{equipment.equipmentName}</td>
                            <td>{equipment.quantity}</td>
                            <td>{new Date(equipment.purchaseDate).toLocaleDateString()}</td>
                            <td>{new Date(equipment.warrantyDate).toLocaleDateString()}</td>
                            <td>{equipment.origin}</td>
                            <td>{equipment.status}</td>
                            <td>
                                <EquipmentUpdatePopup equipmentId={equipment.equipmentId} reset={setResetScreen} />
                                <span onClick={() => handleDeleteEquipment(equipment.equipmentId)}><i className="fa-solid fa-trash-can"></i></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentManager;
