import React, { useEffect, useState } from 'react';
// import { GetListPack } from '../../../service/PackService'; // Ensure you have this service
import PackCreatePopup from './components/PackCreatePopup';
import PackUpdatePopup from './components/PackUpdatePopup';
import { GetAllPacks } from '../service/PackService';

const PackManager = () => {
  const [packs, setPacks] = useState([]);
  const [reset, setReset] = useState(true);
  const token = localStorage.getItem("token");

  function setResetScreen() {
    setReset(!reset);
  }

  useEffect(() => {
    GetAllPacks(1).then((response) => {
      setPacks(response.packs); // Adjust according to your API response
    }).catch((error) => {
      console.error(error);
    });
  }, [reset]);

  function deletePack(packId) {
    fetch(`http://localhost:8080/packs/delete?packId=${packId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.ok) {
        setResetScreen();
        console.log("Xóa thành công");
      } else {
        console.error("Lỗi khi xóa gói tập");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi xóa gói tập", error);
    });
  }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Packs</h2>
      <div className='row'>
        <PackCreatePopup reset={setResetScreen} />
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Pack Id</th>
            <th>Pack Name</th>
            <th>Duration</th>
            <th>Pack Info</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packs.map(pack => (
            <tr key={pack.packId}>
              <td>{pack.packId}</td>
              <td>{pack.packName}</td>
              <td>{pack.duration}</td>
              <td>{pack.packInfo}</td>
              <td><img src="" alt="" /></td>
              <td>
                <PackUpdatePopup packId={pack.packId} reset={setResetScreen} />
                <span onClick={() => deletePack(pack.packId)}><i className="fa-solid fa-trash-can"></i></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackManager;
