import request from './Request';

// Function to get all trainers with pagination
async function GetAllTrainers(page) {
    const endpoint = `http://localhost:8080/trainer?page=${page - 1}&size=10`;
    
    const response = await request(endpoint);
    
    const totalPages = response.page.totalPages;
    const totalTrainers = response.page.totalElements;
    const trainers = [];
    
    for (const trainerData of response._embedded.trainers) {
        const {
            trainerId,
            name,
            experience,
            phone,
            email,
            avatar,
            status
        } = trainerData;
        
        trainers.push({
            trainerId,
            name,
            experience,
            phone,
            email,
            avatar,
            status
        });
    }
    
    return { trainers, totalPages, totalTrainers };
}

// Function to get trainer by ID
async function getTrainerById(trainerId) {
    const endpoint = `http://localhost:8080/trainer/${trainerId}`;
    const response = await request(endpoint);
    
    // Check if response data is available
    if (response) {
        const {
            trainerId,
            name,
            experience,
            phone,
            email,
            avatar,
            status
        } = response;
        
        return {
            trainerId,
            name,
            experience,
            phone,
            email,
            avatar,
            status
        };
    } else {
        console.log("No response data for the given trainer ID");
        return null;
    }
}

// Function to delete trainer by ID
async function deleteTrainer(trainerId) {
    const endpoint = `http://localhost:8080/trainer/${trainerId}`;
    const token = localStorage.getItem("token");
    
    const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    if (response.ok) {
        console.log("Deleted successfully");
        return true;
    } else {
        console.error("Error deleting trainer");
        return false;
    }
}

export { GetAllTrainers, getTrainerById, deleteTrainer };
