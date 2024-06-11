import request from './Request';

// Function to get all equipment with pagination
async function GetAllEquipment(page) {
    console.log(page);
    const endpoint = `http://localhost:8080/equipment?page=${page - 1}&size=10`;
    console.log(endpoint);
    
    const response = await request(endpoint);
    
    const totalPages = response.page.totalPages;
    const totalEquipment = response.page.totalElements;
    const equipments = [];
    
    for (const equipmentData of response._embedded.equipments) {
        const {
            equipmentId,
            equipmentName,
            quantity,
            purchaseDate,
            warrantyDate,
            origin,
            status
        } = equipmentData;
        
        equipments.push({
            equipmentId,
            equipmentName,
            quantity,
            purchaseDate,
            warrantyDate,
            origin,
            status
        });
    }
    
    return { equipments, totalPages, totalEquipment };
}

// Function to get equipment by ID
async function getEquipmentById(equipmentId) {
    const endpoint = `http://localhost:8080/equipment/${equipmentId}`;
    const response = await request(endpoint);
    
    // Check if response data is available
    if (response) {
        const {
            equipmentId,
            equipmentName,
            quantity,
            purchaseDate,
            warrantyDate,
            origin,
            status
        } = response;
        
        return {
            equipmentId,
            equipmentName,
            quantity,
            purchaseDate,
            warrantyDate,
            origin,
            status
        };
    } else {
        console.log("No response data for the given equipment ID");
        return null;
    }
}

export { GetAllEquipment, getEquipmentById };
