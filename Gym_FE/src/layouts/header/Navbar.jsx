import React, { ChangeEvent, useState } from "react";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { getRoleByToken, getUsernameByToken, isToken, logout } from "../../utils/JWTService";


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

 // Kiểm tra đường dẫn hiện tại để điều khiển hiển thị navbar
 React.useEffect(() => {
  const { pathname } = location;
  setIsNavbarVisible(!pathname.includes('/login') && !pathname.includes('/sign-up'));
}, [location.pathname]);
  
    return(
        <nav className={isNavbarVisible ? "navbar navbar-expand-lg navbar-light navbar-bg-custom border-primary" : "d-none"} style={{border: "1px solid #007bff",}} >
        <div className="container-fluid ">
          <a className="navbar-brand col" href="/">Home</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          

          
          
            {/* checkToken */}
          {!isToken() && (
            
						<div className="me-1  ">
                           
                            
							<Link to={"/login"} >
              
              <button className="btn btn-outline-success me-2" type="button" >
            Login
          </button>
							</Link>
							<Link to={"/sign-up"}>
              <button className="btn btn-outline-success" type="button" >
            SignUp 
          </button>
							</Link>
                            </div>
						
					)}
  
          {isToken() && (
						<div className="row ">
              
              
							{/* <!-- Notifications --> */}
							{/* <div className='nav-item dropdown '>
								
                <NavLink className="nav-link dropdown-toggle" 
                to="#" 
                id="navbarDropdownMenuLink2" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                <i className='fas fa-bell '></i>
									<span className='badge rounded-pill badge-notification bg-danger'>
										1
									</span>
                </NavLink>
								<ul
									className='dropdown-menu dropdown-menu-end'
									aria-labelledby='navbarDropdownMenuLink2'
								>
									<li>
										<a className='dropdown-item' href="#">
											Some news
										</a>
									</li>
									<li>
										<a className='dropdown-item' href="#">
											Another news
										</a>
									</li>
									<li>
										<a className='dropdown-item' href="#">
											Something else here
										</a>
									</li>
								</ul>

							</div> */}
							{/* <!-- Avatar --> */}
								{/* <div className="col-8 text-end">
									<button className="btn btn-outline-primary" onClick={() => navigate("/create-post")}>
										Đăng bài <i className="fas fa-edit"></i>
									</button>
								</div> */}
							<div className='dropdown col-4 mt-1'>
							<a
									className='dropdown-toggle d-flex align-items-center hidden-arrow nav-link'
									href='#'
									id='navbarDropdownMenuAvatar'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									{getUsernameByToken()}
								</a>
								
								<ul
									className='dropdown-menu dropdown-menu-end'
									aria-labelledby='navbarDropdownMenuAvatar'
								>
									<li>
										<Link to={"/profile"} className='dropdown-item'>
											Thông tin cá nhân
										</Link>
									</li>
									<li>
										<Link
											className='dropdown-item'
											to='/my-pack'
										>
											Gói của tôi
										</Link>
									</li>
									{getRoleByToken() === "ADMIN" && (
										<li>
											<Link
												className='dropdown-item'
												to='/'
											>
												Quản lý gói tập
											</Link>
										</li>
									)}
									<li>
										<a
											className='dropdown-item'
											style={{ cursor: "pointer" }}
											onClick={() => {
												
												logout(navigate);
												
											}}
										>
											Logout
										</a>
									</li>
								</ul>
							</div>
						</div>
					)}
        </div>
      </nav>
    );
}

export default Navbar;