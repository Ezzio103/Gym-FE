import request from './Request';

// Function to get all rooms with pagination
async function GetAllRooms(page) {
    console.log(page);
    const endpoint = `http://localhost:8080/room?page=${page - 1}&size=10`;
    console.log(endpoint);
    
    const response = await request(endpoint);
    
    const totalPages = response.page.totalPages;
    const totalRooms = response.page.totalElements;
    const rooms = [];
    
    for (const roomData of response._embedded.rooms) {
        const {
            roomId,
            roomName,
            quantity,
            description
        } = roomData;
        
        rooms.push({
            roomId,
            roomName,
            quantity,
            description
        });
    }
    
    return { rooms, totalPages, totalRooms };
}

// Function to get room by ID
async function getRoomById(roomId) {
    const endpoint = `http://localhost:8080/room/${roomId}`;
    const response = await request(endpoint);
    
    // Check if response data is available
    if (response) {
        const {
            roomId,
            roomName,
            quantity,
            description
        } = response;
        
        return {
            roomId,
            roomName,
            quantity,
            description
        };
    } else {
        console.log("No response data for the given room ID");
        return null;
    }
}

export { GetAllRooms, getRoomById };
