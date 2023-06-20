import axios from 'axios';

// in this function i connect the front whith the back
export function getPokemons(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/pokemons",{
            
        })
        return dispatch({
            type:'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function filterPokemonsByType(payload){// lo que llega aca es lo que le mando del componente
    console.log(payload);
    return {
        type: 'FILTER_BY_TYPE',
        payload
        
    }
}

export function orderByname(payload){
    return{
        type:'ORDER_BY_NAME',
        payload
    }
}

export function  getNamePokemons(name){
    return async function(dispatch){
        try{
            let json = await axios("https://pokeapi.co/api/v2/pokemon?name="+ name);
            return dispatch({
                type:'GET_NAME_POKEMONS',
                payload:json.data
            })
        }catch(error){
            /* console.log(error) */;
        }
    } 
}

export function getTypes(){
    return async function (dispatch){
        let info = await axios("http://localhost:3001/types",{

        })
        return dispatch({
            type:"GET_TYPE",
            payload:info.data})
    }
}

export function postPokemons(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/pokemons",payload)
        console.log(response);
        return response;
    }
}


export function filterCreated(payload){
    return{
        type:'FILTER_CREATED',
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            let json = await axios(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type:'GET_DETAILS',
                payload:json.data
            })
        }catch(error){
            console.log(error);
        }
    }
}

