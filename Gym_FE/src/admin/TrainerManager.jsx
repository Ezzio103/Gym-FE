import React, { useState, useEffect } from 'react';
import { GetAllTrainers } from '../service/TrainerService';
import TrainerCreatePopup from './components/TrainerCreatePopup';
import TrainerUpdatePopup from './components/TrainerUpdatePopup';

const TrainerManager = () => {
    const [trainers, setTrainers] = useState([]);
    const [reset, setReset] = useState(true);
    const token = localStorage.getItem("token");

    function setResetScreen() {
        setReset(!reset);
    }

    useEffect(() => {
        GetAllTrainers(1).then((response) => {
            setTrainers(response.trainers); // Adjust according to your API response
        }).catch((error) => {
            console.error(error);
        });
    }, [reset]);

    const handleDeleteTrainer = async (trainerId) => {
        try {
            const response = await fetch(`http://localhost:8080/trainers/delete?trainerId=${trainerId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setResetScreen();
                console.log("Deleted successfully");
            } else {
                console.error("Error deleting trainer");
            }
        } catch (error) {
            console.error("Error deleting trainer", error);
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List of Trainers</h2>
            <div className='row'>
                <TrainerCreatePopup reset={setResetScreen} />
            </div>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Trainer Id</th>
                        <th>Name</th>
                        <th>Experience</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Avatar</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trainers.map(trainer => (
                        <tr key={trainer.trainerId}>
                            <td>{trainer.trainerId}</td>
                            <td>{trainer.name}</td>
                            <td>{trainer.experience}</td>
                            <td>{trainer.phone}</td>
                            <td>{trainer.email}</td>
                            <td><img src={trainer.avatar} alt="Avatar" style={{ width: '50px', height: '50px' }} /></td>
                            <td>{trainer.status === 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                                <TrainerUpdatePopup trainerId={trainer.trainerId} reset={setResetScreen} />
                                <span onClick={() => handleDeleteTrainer(trainer.trainerId)}><i className="fa-solid fa-trash-can"></i></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainerManager;
