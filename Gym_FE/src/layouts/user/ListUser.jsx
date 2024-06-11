import React, { useEffect, useState } from 'react'
import { GetListUser } from '../../service/UserService'
import CreatePopup from './components/CreatePopup'
import UpdatePopup from './components/UpdatePopup'


const ListUser = () => {

    const [users, setUsers]= useState([])
    const [reset, setReset]= useState(true)
    const token = localStorage.getItem("token");
    function setResetScreen(){
        setReset(!reset)
    }
    useEffect(
        ()=>{
            GetListUser().then(
                (response) =>{

               
                setUsers(response.data._embedded.users) 
              }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        }
        ,[reset])
        const createUser = ()=>{
            alert("da add")
        }
        const updateUser = ()=>{
            alert("da update")
        }

        function deleteUser  (userId){
            // console.log("da vao day")
            fetch(`http://localhost:8080/users/delete?userId=${userId}`, {
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
						.then((response) => {
							if (response.ok) {
                                setReset(!reset)
                                console.log("xoa thanh cong")
								// toast.success("Xoá người dùng thành công");
								// props.setKeyCountReload(Math.random());
							} else {
                                alert("Lỗi khi xoá người dùng");
								// toast.error("Lỗi khi xoá người dùng");
							}
						})
						.catch((error) => {
							alert("Lỗi khi xoá người dùng");
							console.log(error);
						})
                        
        }
    return(
        <div className='container'>
        <h2 className='text-center'>List of Users</h2>
        <div className='row'>
        {/* <div className='col-10'></div> */}
        <CreatePopup reset={setResetScreen}/>
        </div>
        <table className='table table-striped table-bordered'>
        <thead>
        <tr>
        <th>User Id</th>
        <th>User Name</th>
        <th>Name</th>
        <th>User Email</th>
        <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {
        users.map(user =>
        <tr key={user.userId}>
        <td>{user.userId}</td>
        <td>{user.username}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
         
                <UpdatePopup userId={user.userId} reset={setResetScreen}/>
              
            <span onClick={()=>deleteUser(user.userId)}><i className="fa-solid fa-trash-can"></i></span>
        </td>
        </tr>)
        }
        </tbody>
        </table>
        </div>
        )
}

export default ListUser;