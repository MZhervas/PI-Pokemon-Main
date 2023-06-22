import React from "react";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setNme] = useState('')

function handleInputChange(event){
    event.preventDefault()
    setNme(event.target.value)
    console.log(name);// se va guardadno en mi estado local name
    }

function handleSubmit(event){
    event.preventDefault()
    dispatch(getNamePokemons(name)) // despues le llega a mi accion que llama al back y le pide lo que esta escribiendo el usuario
}
useEffect(() => {
    console.log(name);
  }, [name]);

    return (
        <div>
            <input
                type = 'text'
                placeholder = "Buscar..."//voy guardando lo que va tipeando el usuario
                onChange = {(event) => handleInputChange(event)}
            />
            <button type="submit" onClick={(event) => handleSubmit(event)}>
                Buscar
            </button>
        </div>
    )
}