import { useEffect, useState } from "react";


import { getIdUserByToken } from "../../utils/JWTService";
import { Button, Modal } from 'react-bootstrap';
import PackProps from "./components/PackProps";
import { PhanTrang } from "../../utils/PhanTrang";
import { GetAllPacks } from "../../service/PackService";





function PackList({ tuKhoaTimKiem, maTheLoai }) {
   const [packs, setPacks] = useState([]);
   const [task, setTask] = useState(null);
   const [dataLoading, setDataLoading] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const [trangHienTai, setTrangHienTai] = useState(1);
   const [tongSoTrang, setTongSoTrang] = useState(0);
   const [tongSoSach, seTtongSoSach] = useState(0);
   const [search, setSearch] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [minPrice, setMinPrice] = useState(0);
   const [maxPrice, setMaxPrice] = useState(1000000000);
   const [minPeople, setMinPeople] = useState(0);
   const [maxPeople, setMaxPeople] = useState(10000);
   const [taskName, setTaskName] = useState('');

   

   const handleShow = () => setShowModal(true);
   const handleClose = () => setShowModal(false);

   const handleFilterApply = async () => {
   //    console.log('Min Price:', minPrice);
   //    console.log('Max Price:', maxPrice);
   //    console.log('Min People:', minPeople);
   //    console.log('Max People:', maxPeople);

   //    if (taskName !== '') {
   //       await getPacksByFilter(minPrice, maxPrice, minPeople, maxPeople, taskName).then(
   //          (res) => {
   //             if (res != null) {
   //                setPacks(res);
   //             } else {
   //                console.log("Không tìm thấy Pack");
   //             }
   //          }
   //       );
   //    }
   //    else{
   //      await getPacksByPriceAndPeople(minPrice,maxPrice,minPeople,maxPeople).then(
   //          (res)=>{
   //              if(res!=null){
   //              setPacks(res)
   //          }else{
   //              console.log("Không tìm thấy Pack")
   //          }
   //          }
   //      );
   //    }
   //    setSearch(!search);
   //    setShowModal(false);
   };

   useEffect(() => {
      setTrangHienTai(1);
   }, [tuKhoaTimKiem, search]);

   useEffect(() => {
      if (tuKhoaTimKiem === '' && maTheLoai === 0) {
         GetAllPacks(trangHienTai).then(
            res => {
               setPacks(res.packs);
               setTongSoTrang(res.totalPages);
               setDataLoading(false);
            }
         ).catch(
            error => {
               setBaoLoi(error.message)
            }
         );
      } else {
         // Thực hiện tìm kiếm theo từ khóa
      }
   }, [trangHienTai, tuKhoaTimKiem, maTheLoai]);

   const phanTrang = (trangHienTai) => {
      setTrangHienTai(trangHienTai)
   };

   if (dataLoading) {
      return (
         <div className="loading-container">
            <h1>Data Loading</h1>
         </div>
      );
   }

   if (baoLoi) {
      return (
         <div>
            <h1>ERROR</h1>
         </div>
      );
   }

   if (packs.length === 0) {
      return (
         <div className="container mt-5">
            <div className="d-flex align-items-center justify-content-center">
               <h1>Hiện không tìm thấy pack!</h1>
            </div>
         </div>
      );
   }

   return (
      <div className="container">
         {/* Modal Filter */}
         <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="mb-3">
                  <label htmlFor="minPrice" className="form-label">Min Price</label>
                  <input type="number" className="form-control form-control-sm" id="minPrice" value={minPrice} min={0} max={maxPrice - 1} onChange={(e) =>{ setMinPrice(parseInt(e.target.value))} }/>
               </div>
               <div className="mb-3">
                  <label htmlFor="maxPrice" className="form-label">Max Price</label>
                  <input type="number" className="form-control form-control-sm" id="maxPrice" value={maxPrice} min={minPrice + 1} max={1000000000} onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
               </div>
               <div className="mb-3">
                  <label htmlFor="minPeople" className="form-label">Min People</label>
                  <input type="number" className="form-control form-control-sm" id="minPeople" value={minPeople} min={1} max={maxPeople - 1} onChange={(e) => setMinPeople(parseInt(e.target.value))} />
               </div>
               <div className="mb-3">
                  <label htmlFor="maxPeople" className="form-label">Max People</label>
                  <input type="number" className="form-control form-control-sm" id="maxPeople" value={maxPeople} min={minPeople + 1} max={10000} onChange={(e) => setMaxPeople(parseInt(e.target.value))} />
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>Close</Button>
               <Button variant="primary" onClick={handleFilterApply}>Apply Filter</Button>
            </Modal.Footer>
         </Modal>

         <div className="row">
            <div className="col-8 ">
               <Button variant="btn-primary " onClick={handleShow}>
                  <i className="fas fa-filter"></i> Filter
               </Button>
            </div>
            <div className="col-4 text-end">
               <div className="d-flex">
                  <input
                     className="form-control me-2"
                     type="search"
                     placeholder="Tìm kiếm theo tên"
                     aria-label="Search"
                     value={taskName}
                     onChange={(e) => setTaskName(e.target.value)} // Update taskName khi có thay đổi
                  />
                  <button className="btn btn-outline-success" type="button" onClick={handleFilterApply}>
                     <i className="fas fa-search"></i>
                  </button>
               </div>
            </div>
         </div>

         <div className="row mt-4">
            {  
               packs.map((pack) => {
                  
                     return <PackProps key={pack.packId}  pack={pack} />;
                  
               })
            }
         </div>
         <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
      </div>
   );
}

export default PackList;
