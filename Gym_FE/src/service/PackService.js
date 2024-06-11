import axios from 'axios'
import React from 'react'
import request from './Request';

const PackUrl= "http://localhost:8080/pack"

//  const GetAllPacks =  async () => await axios.get(PackUrl)


// Hàm này thực hiện lấy tất cả các bài đăng dựa trên trang và kích thước trang
 async function GetAllPacks(page) {
    console.log(page)
    const endpoint = `http://localhost:8080/pack?page=${ page - 1}&size=10`;
    console.log(endpoint)
   
    const response = await request(endpoint);
   
   
    const totalPages = response.page.totalPages;
    const totalPacks = response.page.totalElements;
    const packs = [];
    for (const packData of response._embedded.packs) {
       const packId = packData.packId;
       const packName = packData.packName;
       const packInfo = packData.packInfo;
       const duration = packData.duration;
       const image = packData.image;
       const price = packData.price;
 
  
 
       
      packs.push({packId : packId, packName : packName , packInfo : packInfo, duration : duration, price : price ,image : image});
       
    }
 
    return {packs : packs, totalPages : totalPages, totalPacks : totalPacks};
 }


 // Hàm này thực hiện lấy thông tin một bài đăng dựa trên id
 async function getPacktById(packId) {
    const endpoint = `http://localhost:8080/pack/${packId}`;
    const response = await request(endpoint);
 
    // Kiểm tra nếu có dữ liệu pack trước khi xử lý
    if (response) {
       const packId = response.packId;
       const packName = response.packName;
        const packInfo = response.packInfo;
        const duration = response.duration;
        const image = response.image;
        const price = response.price;
        return {packId : packId, packName : packName, packInfo : packInfo ,duration : duration, price : price, image : image}
   
    } else {
       // Trả về null nếu không có dữ liệu
       console.log("khong co du lieu response pack");
       return null;
    }
 }

 export { GetAllPacks , getPacktById};