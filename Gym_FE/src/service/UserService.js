import axios from 'axios'
import React from 'react'
import request from './Request'
import { getIdUserByToken } from '../utils/JWTService'

const UserUrl= "http://localhost:8080/user"

const GetListUser =  async () => await axios.get(UserUrl)



async function get1User(idUser) {
    const endpoint = `http://localhost:8080/user/${idUser}`;
    const responseUser = await request(endpoint);
 
    // Khởi tạo đối tượng UserModel từ dữ liệu nhận được từ server
    const user = {
       userId: responseUser.userId,
       username : responseUser.username,
       email :  responseUser.email,
       name :  responseUser.name,
       age : responseUser.age,
       birthday : responseUser.birthday,
       avatar : responseUser.avatar,
        isActivated : responseUser.isActivated,
       };
  
    return user;
 }


 async function updateProfile(
  
    username,
    email,
    name,
    
    birthday,
    age,
    avatar ,
 
 
 ) {
    const id = getIdUserByToken();
    const token = localStorage.getItem("token");
    const endpoint =  `http://localhost:8080/user/${id}`;
    await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            username: username,
            email: email,
            name : name,
            age : age,
            birthday : birthday,
            avatar : avatar,
          
        })
    }).then((response) => {
        if (response.ok) {
            console.log("Đã cập nhật thông tin người dùng thành công!");
        } else {
            console.error("Gặp lỗi trong quá trình cập nhật thông tin người dùng!");
        }
    });
 }

 async function updateUser(
    userId,
    username,
    email,
    name,
    isActivated,
    birthday,
    age,
    avatar ,
 
 
 ) {
    // const id = getIdUserByToken();
    const token = localStorage.getItem("token");
    const endpoint =  `http://localhost:8080/user/${userId}`;
    await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            username: username,
            email: email,
            name : name,
            age : age,
            isActivated : isActivated,
            birthday : birthday,
            avatar : avatar,
          
        })
    }).then((response) => {
        if (response.ok) {
            console.log("Đã cập nhật thông tin người dùng thành công!");
        } else {
            console.error("Gặp lỗi trong quá trình cập nhật thông tin người dùng!");
        }
    });
 }

 export { GetListUser, get1User, updateProfile ,updateUser};