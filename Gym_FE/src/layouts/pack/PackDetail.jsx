import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { dinhDangSo } from "../../utils/DinhSangSo";
import { getIdUserByToken } from "../../utils/JWTService";
import { getPacktById } from "../../service/PackService";



function PackDetail() {

    const {packId} = useParams()
    let packIdNumber = 0;
    try {
        packIdNumber = parseInt(packId+'') ;
         if(Number.isNaN(packIdNumber)){
        packIdNumber = 0;
    }

    } catch (error) {
        packIdNumber = 0;
        console.error("Error: "+error)
    }
   

    const [applicants, setApplicants] = useState([]);
   const [pack, setPack] = useState(null);
   const [task, setTask] = useState(null);
   const [dangTaiDuLieu,setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const userId = getIdUserByToken();
   const [url, setUrl] = useState('');
   

   const handleApply = async (e) => {

    e.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
    
    const token = localStorage.getItem("token");
    // setUrlToRedirect("http://localhost:3000/");
    // setUrl("http://localhost:3000/");
    // window.location.href = "http://localhost:3000/";
    
    // fetch(  `http://localhost:8080/pack-registration/register`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type' : 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify({
    //                 user:{userId : userId},
    //                 pack : {
    //                     packId : packId
    //                 },
    //             })
    //         }
    //     ).then((reponse)=>{
    //         if(reponse.ok){
    //             alert("Đã gửi đăng ký thành công!");
                
               
    //         }
    //         else
    //         {
    //             alert("Gặp lỗi trong quá trình đăng ký!");
    //         }
        
    //     })
    fetch(`http://localhost:8080/vnpay/create-payment?amount=1000000`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.text()) // assuming the response is the redirect URL
      .then(url => {
        window.location.href = url; // Redirect the user to the payment URL
      })
      .catch((error) => {
        alert("Gặp lỗi trong quá trình đăng ký!");
        console.error("Error during payment process:", error);
      });
  };


  const handleConfirm = async () => {
    // Gửi yêu cầu xác nhận công việc đến server với danh sách ứng viên đã chọn
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/packs/registration `, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: task?.taskId,
            applicants: applicants.map((applicant) => applicant.userId),
        }),
    });
    if (response.ok) {
        alert("Gửi yêu cầu đăng ký thành công!");
        
    } else {
        alert("Gặp lỗi trong quá trình gửi yêu cầu đăng ký!");
    }
};
//    const handleSoLuongChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
//     const soLuongKho = sach && sach.soLuong?sach.soLuong:0;
//     const soLuong= parseInt(e.target.value);
//     if(!isNaN(soLuong) && soLuong>1 && soLuong<=soLuongKho){
//         setSoLuong(soLuong)
//     }
//    }

    useEffect(()=>{
        getPacktById(packId).then(
            (pack) =>{  setPack(pack);
               
               
                setDangTaiDuLieu(false);}
               
            
        ).catch((error) =>{
            setBaoLoi(error.message);
            setDangTaiDuLieu(false);
        })
            
    
          
    },[packId]) 

    

   if(dangTaiDuLieu){
    return (
        <div className="loading-container">
          <h1>Data Loading</h1>
        </div>
      );
   }
   if(baoLoi){
    return(
        <div>
            <h1>Gap loi o packdetail</h1>
        </div>
    )
   }
   
   if (!pack) {
    return (
        <div>
            <h1>Pack không tồn tại!</h1>
        </div>
    );
}

    return (

        <div className="container">
            <div className="row mt-4 mb-4">
               <div className="col-4">
               <img   src={pack.image}
                    className="card-img-top"
                    alt={pack.packInfo} style={{maxWidth:"250px"}} />
               </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>
                                
                                { pack.packName}
                            </h1>
                            <div className="row mt-2">
                        <div className="col-2 "><h4> <i className="fas fa-dollar-sign"></i></h4></div>
                        <div className="col-9 text-end"><h4><strong>{dinhDangSo(pack.price)+'đ'}</strong></h4></div>
                   
                    </div>
                    {/* <div className="row mt-2">
                        <div className="col-2 "> <h4><i className="fas fa-map-marker-alt"></i></h4></div>
                        <div className="col-9 text-end"><h4></h4><h4 className="card-text">{pack.pack} </h4></div>
                   
                    </div> */}
                    <div className="row mt-2">
                        <div className="col-2 "> <h4><i className="fas fa-user"></i></h4></div>
                        <div className="col-9 text-end"><h4 className="card-text">{pack.duration} tháng</h4></div>
                   
                    </div>
                            
                            <hr/>
                                <div dangerouslySetInnerHTML={{__html: (pack.packInfo+'')}}/>
                            <hr/>
                            
                            {/* hien thi danh sach nguoi dang ky */}
                            {/* {task?.taskStatus!==0&&
                            task?.applicants && task?.applicants.length > 0 &&
                             task?.authorId === userId && (
                                <div className="row">
                                <div className="col-12">
                                    <h3>Danh sách người đăng ký</h3>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên người đăng ký</th>
                                                <th>Email</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {task?.applicants.map((applicant, index) => (
                                                <tr key={applicant.userId}>
                                                    <td>{index + 1}</td>
                                                    <td>{applicant.lastName}</td>
                                                    <td>{applicant.email}</td>
                                                    <td>
                                                       
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                                )}
                             {task?.taskStatus===0&&
                            task?.applicants && task?.applicants.length > 0 &&
                             task?.authorId === userId && (
                                <div className="row">
                                <div className="col-12">
                                    <h3>Danh sách người đăng ký</h3>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên người đăng ký</th>
                                                <th>Email</th>
                                                <th>Chọn</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {task?.applicants.map((applicant, index) => (
                                                <tr key={applicant.userId}>
                                                    <td>{index + 1}</td>
                                                    <td>{applicant.lastName}</td>
                                                    <td>{applicant.email}</td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={applicants.some((selected) => selected.userId === applicant.userId)}
                                                            onChange={(e) => {
                                                                const checked = e.target.checked;
                                                                setApplicants((prevApplicants) => {
                                                                    if (checked) {
                                                                        return [...prevApplicants, applicant];
                                                                    } else {
                                                                        return prevApplicants.filter((prev) => prev.userId !== applicant.userId);
                                                                    }
                                                                });
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                                )} */}
                        </div>
                        <div className="col-4">
                            {/* <div className="mb-2">Số lượng</div> */}
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-4 mt-4">
    
        <>
            <div className="col-8"></div>
            <div className="col-4">
                
                    <div>
                        <button type="button" className="btn btn-primary" onClick={handleApply}>
                            Đăng ký
                        </button>
                        {/* <button type="button" className="btn btn-primary" onClick={handleConfirm}>
                            Xác Nhận
                        </button> */}
                    </div>
                
            </div>
        </>
    
</div>

        </div>
    );
}

export default PackDetail;