
const inicialState = {
    pokemons: [],
    allPokemons:[],
    types:[],
    detail:[],
    orderByAttack: '',
}

function rootReducer (state = inicialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload,
                allPokemons:action.payload
            }

            case 'FILTER_BY_TYPE':
                const allPokemons = state.allPokemons
                const typeFiltered = action.payload === 'All' ? allPokemons: allPokemons.filter(element => element.type === action.payload)
                console.log("Acción 'FILTER_BY_TYPE' hecha. Tipo:", action.payload);
            return{
                ...state,
                pokemons:typeFiltered
            }

            case 'POST_POKEMONS':
                return{
                    ...state,
                }
            case 'GET_TYPE':
                return{
                    ...state,
                    types:action.payload
                }

            case 'ORDER_BY_NAME':
                const sortedArr = action.payload ==='asc'?
                state.pokemons.sort(function(a,b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0
                }):
                state.pokemons.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0
                })
                return{
                    ...state,
                    pokemons:sortedArr
                }
                
                case 'GET_NAME_POKEMONS':
                    const newPokemons = Array.isArray(action.payload) ? action.payload : [action.payload];
                    return {
                      ...state,
                      pokemons: [...state.pokemons, ...newPokemons]
                    }
                case 'FILTER_CREATED':

                    const createdFilter = action.payload === 'Created' ? state.allPokemons.filter(element => element.createdInDb):state.allPokemons.filter(element =>!element.createdInDb) 
                    return{
                        ...state,
                        pokemons:action.payload ==='All' ? state.allPokemons:createdFilter
                    }
                    case 'GET_DETAILS':
                        console.log('Detalles del Pokémon:', action.payload);
                        return{
                            ...state,
                            detail:action.payload
                        }
            default:
                return state;
    }
}

export default rootReducer;