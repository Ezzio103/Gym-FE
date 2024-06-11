import { useState } from 'react'

import './App.css'

import "bootstrap/dist/css/bootstrap.min.css"
import Login from './layouts/user/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListUser from './layouts/user/ListUser'
import SignUp from './layouts/user/SignUp'
import AccountActive from './layouts/user/AccountActive'
import HomePage from './layouts/homePage/HomePage'
import Navbar from './layouts/header/Navbar'
import Profile from './layouts/user/Profile'
import PackDetail from './layouts/pack/PackDetail'
import PackManager from './admin/PackManager'
import EquipmentManager from './admin/EquipmentManager'
import RoomManager from './admin/RoomManager'
import TrainerManager from './admin/TrainerManager'
import PaymentSuccess from './layouts/vnpay/PaymentSuccess'


function App() {
  const [count, setCount] = useState(0)

  return (
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<HomePage />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='/sign-up' element={<SignUp />}/>
    <Route path='/pack/:packId' element={<PackDetail />}/>
    <Route path='/account-active/:email/:maKichHoat' element={<AccountActive />}/>
    <Route path='/users' element={<ListUser />}/>
    <Route path='/profile' element={<Profile />}/>
    <Route path='/admin/pack-manager' element={<PackManager />}/>
    <Route path='/admin/equipment' element={<EquipmentManager />}/>
    <Route path='/admin/room' element={<RoomManager />}/>
    <Route path='/admin/trainer' element={<TrainerManager />}/>
    <Route path='/payment-success' element={<PaymentSuccess />}/>
    </Routes>
    
  
   </BrowserRouter>
    
  )
}

export default App
