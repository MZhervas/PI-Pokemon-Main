import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setNme] = useState("")

function handleInputChange(event){
    event.preventDefault()
    setNme(event.target.value)
    console.log(name);
    }

function handleSubmit(event){
    event.preventDefault()
    dispatch(getNamePokemons(name))
}

    return (
        <div>
            <input
                type = 'text'
                placeholder = "Buscar..."
                onChange = {(event) => handleInputChange(event)}
            />
            <button type="submit" onClick={(event) => handleSubmit(event)}>
                Buscar
            </button>
        </div>
    )
}