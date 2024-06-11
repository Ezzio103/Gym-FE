import React, { useState } from "react";

function SignUp() {

    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
   
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [gioiTinh, setGioiTinh] = useState('M');
    const [avatar   , setAvatar] = useState(null);

    // Các biến báo lỗi
    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMatKhau, setErrorMatKhau] = useState("");
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState("");
    const [thongBao, setThongBao] = useState("");
    
    // Convert file to Base64
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result) : null);
            reader.onerror = (error) => reject(error);
        });
    };

    // Xử lý thông tin
    const handleSubmit = async (e) => {
        // Clear any previous error messages
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('');
        setErrorMatKhauLapLai('');

        // Tránh click liên tục
        e.preventDefault();

        // Kiểm tra các điều kiện và gán kết quả vào biến
        const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(tenDangNhap);
        const isEmailValid = !await kiemTraEmailDaTonTai(email);
        const isMatKhauValid = !kiemTraMatKhau(matKhau);
        const isMatKhauLapLaiValid = !kiemTraMatKhauLapLai(matKhauLapLai);

        // Kiểm tra tất cả các điều kiện
        if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauLapLaiValid) {
           const avatarBase64 = await getBase64(avatar);
            try {
                const url = 'http://localhost:8080/account/signup';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                    },
                    body: JSON.stringify({
                        username: tenDangNhap,
                        email: email,
                        password: matKhau,
                       
                       avatar : avatarBase64,
                        
                        activeNumber:"",
                       isActived: 0,
                        
                    })
                }
                );

                if(response.ok){
                    setThongBao("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
                }else{
                    console.log(response.json());
                    setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
                }
            } catch (error) {
                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
            }
        }
    }


    // KIỂM TRA TÊN ĐĂNG NHẬP ////////////////////////////////////////////////
    const kiemTraTenDangNhapDaTonTai = async (tenDangNhap) => {
        // end-point
        const url = `http://localhost:8080/user/search/existsByUsername?username=${tenDangNhap}`;
        console.log(url);
        // call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorTenDangNhap("Tên đăng nhập đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
            return false; // Xảy ra lỗi
        }
    }

    const handleTenDangNhapChange = (e) => {
        // Thay đổi giá trị
        setTenDangNhap(e.target.value);
        // Kiểm tra
        setErrorTenDangNhap('');
        // Kiểm tra sự tồn tại
        return kiemTraTenDangNhapDaTonTai(e.target.value);
    }

    //Xử Lý Thay Đổi File  /////////////////////////////////////////////////////////////////////////////
    const handleAvatarChange=(e)=>{
        if(e.target.files){
            const file= e.target.files[0];
            setAvatar(file);
        }
    }

    // KIỂM TRA TÊN ĐĂNG NHẬP ////////////////////////////////////////////////
    const kiemTraEmailDaTonTai = async (email) => {
        // end-point
        const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;
        console.log(url);
        // call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail("Email đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra email:", error);
            return false; // Xảy ra lỗi
        }
    }

    const handleEmailChange = (e) => {
        // Thay đổi giá trị
        setEmail(e.target.value);
        // Kiểm tra
        setErrorEmail('');
        // Kiểm tra sự tồn tại
        return kiemTraEmailDaTonTai(e.target.value);
    }

    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA MẬT KHẨU ////////////////////////////////////////////////
    const kiemTraMatKhau = (matKhau) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(matKhau)) {
            setErrorMatKhau("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
            return true;
        } else {
            setErrorMatKhau(""); // Mật khẩu hợp lệ
            return false;
        }
    }

    const handleMatKhauChange = (e) => {
        // Thay đổi giá trị
        setMatKhau(e.target.value);
        // Kiểm tra
        setErrorMatKhau('');
        // Kiểm tra sự tồn tại
        return kiemTraMatKhau(e.target.value);
    }

    ///////////////////////////////////////////////////////////////////////////////

    // KIỂM TRA MẬT KHẨU LẶP LẠI ////////////////////////////////////////////////
    const kiemTraMatKhauLapLai = (matKhauLapLai) => {
        if (matKhauLapLai !== matKhau) {
            setErrorMatKhauLapLai("Mật khẩu không trùng khớp.");
            return true;
        } else {
            setErrorMatKhauLapLai(""); // Mật khẩu trùng khớp
            return false;
        }
    }

    const handleMatKhauLapLaiChange = (e) => {
        // Thay đổi giá trị
        setMatKhauLapLai(e.target.value);
        // Kiểm tra
        setErrorMatKhauLapLai('');
        // Kiểm tra sự tồn tại
        return kiemTraMatKhauLapLai(e.target.value);
    }

    ///////////////////////////////////////////////////////////////////////////////

    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="tenDangNhap"
                            className="form-control"
                            value={tenDangNhap}
                            onChange={handleTenDangNhapChange}
                        />
                        <div style={{ color: "red" }}>{errorTenDangNhap}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div style={{ color: "red" }}>{errorEmail}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            id="matKhau"
                            className="form-control"
                            value={matKhau}
                            onChange={handleMatKhauChange}
                        />
                        <div style={{ color: "red" }}>{errorMatKhau}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matKhauLapLai" className="form-label">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            id="matKhauLapLai"
                            className="form-control"
                            value={matKhauLapLai}
                            onChange={handleMatKhauLapLaiChange}
                        />
                        <div style={{ color: "red" }}>{errorMatKhauLapLai}</div>
                    </div>
                   
                    {/* <div className="mb-3">
                        <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                        <input
                            type="text"
                            id="gioiTinh"
                            className="form-control"
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e.target.value)}
                        />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">Avatar</label>
                        <input
                            type="file"
                            id="gioiTinh"
                            className="form-control"
                            accept="images/"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                        <div style={{ color: "green" }}>{thongBao}</div>

                    </div>
                </form>
            </div>
        </div>

    );
}

export default SignUp;


// import React, { useState } from "react";

// function SignUp() {
//     const [tenDangNhap, setTenDangNhap] = useState("");
//     const [email, setEmail] = useState("");
//     const [matKhau, setMatKhau] = useState("");
//     const [matKhauLapLai, setMatKhauLapLai] = useState("");
//     const [name, setName] = useState("");
//     const [age, setAge] = useState("");
//     const [birthday, setBirthday] = useState("");
//     const [avatar, setAvatar] = useState(null);
//     const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
//     const [errorEmail, setErrorEmail] = useState("");
//     const [errorMatKhau, setErrorMatKhau] = useState("");
//     const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState("");
//     const [thongBao, setThongBao] = useState("");

//     const getBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result ? (reader.result) : null);
//             reader.onerror = (error) => reject(error);
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorTenDangNhap('');
//         setErrorEmail('');
//         setErrorMatKhau('');
//         setErrorMatKhauLapLai('');

//         const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(tenDangNhap);
//         const isEmailValid = !await kiemTraEmailDaTonTai(email);
//         const isMatKhauValid = !kiemTraMatKhau(matKhau);
//         const isMatKhauLapLaiValid = !kiemTraMatKhauLapLai(matKhauLapLai);

//         if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauLapLaiValid) {
//             try {
//                 const avatarBase64 = avatar ? await getBase64(avatar) : null;
//                 const url = 'http://localhost:8080/account/signup';

//                 const response = await fetch(url, {
//                     method: 'POST',
//                     headers: {
//                         'Content-type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         username: tenDangNhap,
//                         email: email,
//                         password: matKhau,
//                         activeNumber: "",
//                         isActivated: 0,
//                         name: name,
//                         age: age ? parseInt(age) : null,
//                         birthday: birthday,
//                         avatar: avatarBase64
//                     })
//                 });

//                 if (response.ok) {
//                     setThongBao("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
//                 } else {
//                     console.log(await response.json());
//                     setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.");
//                 }
//             } catch (error) {
//                 setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.");
//             }
//         }
//     };

//     const kiemTraTenDangNhapDaTonTai = async (tenDangNhap) => {
//         const url = `http://localhost:8080/user/search/existsByUsername?username=${tenDangNhap}`;
//         try {
//             const response = await fetch(url);
//             const data = await response.text();
//             if (data === "true") {
//                 setErrorTenDangNhap("Tên đăng nhập đã tồn tại!");
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
//             return false;
//         }
//     };

//     const handleTenDangNhapChange = (e) => {
//         setTenDangNhap(e.target.value);
//         setErrorTenDangNhap('');
//         return kiemTraTenDangNhapDaTonTai(e.target.value);
//     };

//     const handleAvatarChange = (e) => {
//         if (e.target.files) {
//             const file = e.target.files[0];
//             setAvatar(file);
//         }
//     };

//     const kiemTraEmailDaTonTai = async (email) => {
//         const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;
//         try {
//             const response = await fetch(url);
//             const data = await response.text();
//             if (data === "true") {
//                 setErrorEmail("Email đã tồn tại!");
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             console.error("Lỗi khi kiểm tra email:", error);
//             return false;
//         }
//     };

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//         setErrorEmail('');
//         return kiemTraEmailDaTonTai(e.target.value);
//     };

//     const kiemTraMatKhau = (matKhau) => {
//         const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//         if (!passwordRegex.test(matKhau)) {
//             setErrorMatKhau("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
//             return true;
//         } else {
//             setErrorMatKhau("");
//             return false;
//         }
//     };

//     const handleMatKhauChange = (e) => {
//         setMatKhau(e.target.value);
//         setErrorMatKhau('');
//         return kiemTraMatKhau(e.target.value);
//     };

//     const kiemTraMatKhauLapLai = (matKhauLapLai) => {
//         if (matKhauLapLai !== matKhau) {
//             setErrorMatKhauLapLai("Mật khẩu không trùng khớp.");
//             return true;
//         } else {
//             setErrorMatKhauLapLai("");
//             return false;
//         }
//     };

//     const handleMatKhauLapLaiChange = (e) => {
//         setMatKhauLapLai(e.target.value);
//         setErrorMatKhauLapLai('');
//         return kiemTraMatKhauLapLai(e.target.value);
//     };

//     return (
//         <div className="container">
//           <h1 className="mt-5 text-center">Đăng ký</h1>
//           <div className="mb-3 col-md-6 col-12 mx-auto">
//             <form onSubmit={handleSubmit} className="form">
//               {/* Username Field */}
//               <div className="mb-3">
//                 <label htmlFor="tenDangNhap" className="form-label">
//                   Tên đăng nhập
//                 </label>
//                 <input
//                   type="text"
//                   id="tenDangNhap"
//                   className="form-control"
//                   value={tenDangNhap}
//                   onChange={handleTenDangNhapChange}
//                 />
//                 {errorTenDangNhap && <div style={{ color: "red" }}>{errorTenDangNhap}</div>}
//               </div>
      
//               {/* Email Field */}
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Email
//                 </label>
//                 <input
//                   type="email" // Use "email" type for email validation
//                   id="email"
//                   className="form-control"
//                   value={email}
//                   onChange={handleEmailChange}
//                 />
//                 {errorEmail && <div style={{ color: "red" }}>{errorEmail}</div>}
//               </div>
      
//               {/* Password Field */}
//               <div className="mb-3">
//                 <label htmlFor="matKhau" className="form-label">
//                   Mật khẩu
//                 </label>
//                 <input
//                   type="password"
//                   id="matKhau"
//                   className="form-control"
//                   value={matKhau}
//                   onChange={handleMatKhauChange}
//                 />
//                 {errorMatKhau && <div style={{ color: "red" }}>{errorMatKhau}</div>}
//               </div>
      
//               {/* Repeat Password Field */}
//               <div className="mb-3">
//                 <label htmlFor="matKhauLapLai" className="form-label">
//                   Nhập lại mật khẩu
//                 </label>
//                 <input
//                   type="password"
//                   id="matKhauLapLai"
//                   className="form-control"
//                   value={matKhauLapLai}
//                   onChange={handleMatKhauLapLaiChange}
//                 />
//                 {errorMatKhauLapLai && <div style={{ color: "red" }}>{errorMatKhauLapLai}</div>}
//               </div>
      
//               {/* Name Field */}
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">
//                   Họ và Tên
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   className="form-control"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
      
//               {/* Age Field */}
//               <div className="mb-3">
//                 <label htmlFor="age" className="form-label">
//                   Tuổi
//                 </label>
//                 <input
//                   type="number"
//                   id="age"
//                   className="form-control"
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                 />
//               </div>
      
//               {/* Birthday Field */}
//               <div className="mb-3">
//                 <label htmlFor="birthday" className="form-label">
//                   Ngày sinh
//                 </label>
//                 <input
//                   type="date"
//                   id="birthday"
//                   className="form-control"
//                   value={birthday}
//                   onChange={(e) => setBirthday(e.target.value)}
//                 />
//               </div>
      
//               {/* Avatar Field */}
//               <div className="mb-3">
//                 <label htmlFor="avatar" className="form-label">
//                   Ảnh đại diện
//                 </label>
//                 <input type="file" id="avatar" className="form-control" onChange={handleAvatarChange} />
//               </div>
      
//               <button type="submit" className="btn btn-primary">
//                 Đăng ký
//               </button>
//               {thongBao && <div style={{ color: "green" }}>{thongBao}</div>}
//             </form>
//           </div>
//         </div>
//       );
// }

// export default SignUp;
