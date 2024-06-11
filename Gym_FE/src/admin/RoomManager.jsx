import React, { useState, useEffect } from 'react';
// import RoomCreatePopup from './RoomCreatePopup';
// import RoomUpdatePopup from './RoomUpdatePopup';
import { GetAllRooms } from '../service/RoomService';
import RoomCreatePopup from './components/RoomCreatePopup';
import RoomUpdatePopup from './components/RoomUpdatePopup';
// import { GetAllRooms } from '../service/RoomService';

const RoomManager = () => {
    const [rooms, setRooms] = useState([]);
    const [reset, setReset] = useState(true);
    const token = localStorage.getItem("token");

    function setResetScreen() {
        setReset(!reset);
    }

    useEffect(() => {
        GetAllRooms(1).then((response) => {
          setRooms(response.rooms); // Adjust according to your API response
        }).catch((error) => {
          console.error(error);
        });
      }, [reset]);

    const handleDeleteRoom = async (roomId) => {
        try {
            const response = await fetch(`http://localhost:8080/rooms/delete?roomId=${roomId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setResetScreen();
                console.log("Deleted successfully");
            } else {
                console.error("Error deleting room");
            }
        } catch (error) {
            console.error("Error deleting room", error);
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List of Rooms</h2>
            <div className='row'>
                <RoomCreatePopup reset={setResetScreen} />
            </div>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Room Id</th>
                        <th>Room Name</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.roomId}>
                            <td>{room.roomId}</td>
                            <td>{room.roomName}</td>
                            <td>{room.quantity}</td>
                            <td>{room.description}</td>
                            <td>
                                <RoomUpdatePopup roomId={room.roomId} reset={setResetScreen} />
                                <span onClick={() => handleDeleteRoom(room.roomId)}><i className="fa-solid fa-trash-can"></i></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomManager;
