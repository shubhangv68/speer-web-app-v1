import React from "react";
import { API } from "../config";

export const ShowImage = ({ item, url }) => (
    <div className="">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className=" mb-2"
            style={{borderRadius:"50%",width:"150px",height:"150px",objectFit:"fill"}}
        />
    </div>
);

