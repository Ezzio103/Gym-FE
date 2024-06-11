import React from "react";
export function dinhDangSo(x){
    if(x===undefined||isNaN(x)){
        return 0
    }
    else 
    return x.toLocaleString("vi-VN");
}