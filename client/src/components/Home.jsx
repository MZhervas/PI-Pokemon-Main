import React from 'react';
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react';//in this line imoprt the hooks 
import {useDispatch, useSelector} from 'react-redux';// in this line i import the hooks of react-redux
import { getPokemons,filterPokemonsByType, orderByname, filterCreated, } from "../actions";
import Card from "./Card";
import Paged from './Paged';
import SearchBar from './SearchBar';
import PokemonCreate from './PokemonCreate';
import './home.css';
import './card.css'



export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state)=>state.pokemons)//!with useselector bring me in allCharacters everything that is in the state of pokemons
    const [orden,setOrden] = useState('')
    const [currentPage,setCurrentPage] = useState(1)//This local state sets page 1 as the default
    const [pokemonsPerPage,setPokemonsPerPage] = useState(12) //This local state says how many Pokemons I'll see per page
    const indexOfLastPokemon = currentPage * pokemonsPerPage 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //0
    const currentPokemons = useSelector((state) => state.pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon));// This line serves to know which characters render depending on the page

    const paged = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

useEffect(()=>{
    dispatch(getPokemons());
},[dispatch])

function handleClick(event){
event.preventDefault();
dispatch(getPokemons());
}

function handleFilterType(event){
    dispatch(filterPokemonsByType(event.target.value));
}

function handleSort(event){
    event.preventDefault();
    dispatch(orderByname(event.target.value))
    setCurrentPage(1)
    setOrden(`Ordenando ${event.target.value}`)
    
}

function handleFilterCreated(event){
    dispatch(filterCreated(event.target.value))
}



return(
    <div className='home-container'>
        
        <h1>Mi pokemon PI</h1>
        <Link  to='/pokemons'><button className='create-button'>Crear personaje</button></Link>
        <button onClick={event=>{handleClick(event)}} className='reload-button'> Volver a cargar los personajes</button>
        <div>
            <p>Ordenar por:</p>
            <select  className='order' onChange={event => handleSort(event)}>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>

             <select  defaultValue='All'  onChange={event => handleFilterType(event)}>
                <option value='All'>Todos</option>
                <option value='normal'>normal</option>
                <option value='fighting'>fighting</option>
                <option value='flying'>flying</option>
                <option value='poison'>poison</option>
                <option value='ground'>ground</option>
                <option value='rock'>rock</option>
                <option value='bug'>bug</option>
                <option value='ghost'>ghost</option>
                <option value='steel'>steel</option>
                <option value='fire'>fire</option>
                <option value='water'>water</option>
                <option value='grass'>grass</option>
                <option value='electric'>electric</option>
                <option value='psychic'>psychic</option>
                <option value='ice'>ice</option>
                <option value='dragon'>dragon</option>
                <option value='dark'>dark</option>
                <option value='fairy'>fairy</option>
                <option value='unknown'>unknown</option>
                <option value='shadow'>shadow</option>
            </select>

            <select onChange={event => handleFilterCreated(event)}>
                <option value="All">Todos</option>
                <option value="Created">Creados</option>
                <option value="Api">Existentes</option>
            </select>

            <SearchBar/>

            <Paged
            pokemongPerPage={pokemonsPerPage}
            allPokemons={allPokemons.length}
            paged={paged}
            />
            </div>
            
        
        <div className='card-container'>

        {currentPokemons?.map((element)=>{
            return(
                <fragment className='cartas'>
                        <Link to={"/home" + element.id}>
                            
                            <Card name={element.name} image={element.image} type={Array.isArray(element.type) ? element.type.join(", ") : element.type} key={element.id}/>
                            
                        </Link>
                    </fragment>
                )
            })
            
        }
        </div>
        </div>
)

}