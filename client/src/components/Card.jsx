import React from "react";
import './card.css'
export default function Card({name,image,type}){
    return(
        <div className="card">
            <h3>Nombre: {name}</h3>
            <h5>Tipo: {type}</h5>
            <img src={image} alt="img not foun" width="200px" height="250"px />
        </div>
    )
}