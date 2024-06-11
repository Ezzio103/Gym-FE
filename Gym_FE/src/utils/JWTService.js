import { jwtDecode } from "jwt-decode";


// export interface JwtPayload {
//    isAdmin: boolean;
//    isStaff: boolean;
//    isUser: boolean;
//    id : number;
//    role : string;
// }
export function isTokenExpired(token) {
   const decodedToken = jwtDecode(token);

   if (!decodedToken.exp) {
      // Token không có thời gian hết hạn (exp)
      return false;
   }

   const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây

   return currentTime < decodedToken.exp;
}

export function isToken() {
   const token = localStorage.getItem('token');
   if (token) {
      return true;
   }
   return false;
}




export function getUsernameByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      return jwtDecode(token).sub;
   }
}

export function getIdUserByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token) ;
      return decodedToken.id;
   }
}

export function getRoleByToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const decodedToken = jwtDecode(token) ;
      return decodedToken.role;
   }
}

export function logout(navigate) {
   navigate("/");
   localStorage.removeItem('token');
//    localStorage.removeItem('cart');
}