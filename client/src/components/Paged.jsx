import React from "react";
import './paged.css'

export default function Paged ({pokemongPerPage, allPokemons, paged}){
    const pageNumbers =[]

    for(let i=0; i<Math.ceil(allPokemons/pokemongPerPage);i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className="paged">
                {pageNumbers && pageNumbers.map(number =>(
                    <li className="number" key={number}>
                    <a onClick={()=>paged(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}