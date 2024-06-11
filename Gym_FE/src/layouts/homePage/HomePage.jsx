import React from "react";

import { useParams } from "react-router-dom";
import Banner from "./components/Banner";
import PackList from "../pack/PackList";


function HomePage(){
   
    return(
        <div>
            <Banner/>
            <PackList tuKhoaTimKiem={''} maTheLoai={0} />
            
        </div>
    )
};
export default HomePage;