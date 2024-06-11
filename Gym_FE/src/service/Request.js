import React from "react";
async function request(duongDan) {
    // truy cap duong dan
    const response = await fetch(duongDan);
    //neu co loi
    if(!response.ok){
        throw new Error(`Xay ra loi khi truy cap ${duongDan}`);
    }
    //neu ok
    return response.json();
}
export default request;