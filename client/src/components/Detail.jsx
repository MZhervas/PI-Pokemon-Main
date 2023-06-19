import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";

export default function Detail(props){
    console.log(props);
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.idPokemon))
    },[dispatch])
    const myPokemon=useSelector((state) =>state.detail)

    return(
        <div>
            {
                myPokemon.length>0?
                <div>
                    <h2>{myPokemon[0].id}</h2>
                    <h1>{myPokemon[0].name}</h1>
                    <img src={ myPokemon[0].img} />
                    <h3>type:{!myPokemon[0].createdInDb? myPokemon[0].type + ' ':myPokemon[0].types.map(element => element.name + (' '))}</h3>
                    <p>Vida: {myPokemon[0].health}</p>
                    <p>Ataque: {myPokemon[0].attack}</p>
                    <p>Defensa: {myPokemon[0].defense}</p>
                    <p>Velocidad: {myPokemon[0].speed}</p>
                    <p>Peso: {myPokemon[0].weight}</p>
                    <p>Altura: {myPokemon[0].height}</p>
                </div>: <p>Loading..</p>
            }
            <Link to={'/home'}>
                <button>Volver</button>
            </Link>
        </div>
    )
}
