const express = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db');

const router = express.Router()

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=120');
    const pokemonList = apiUrl.data.results;
  
    const apiInfo = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const pokemonData = await axios.get(pokemon.url);
        return {
          id: pokemonData.data.id,
          name: pokemonData.data.name,
          image: pokemonData.data.sprites.other.dream_world.front_default,
          health: pokemonData.data.stats[0].base_stat,
          attack: pokemonData.data.stats[1].base_stat,
          defense: pokemonData.data.stats[2].base_stat,
          speed: pokemonData.data.stats[5].base_stat,
          height: pokemonData.data.height,
          weight: pokemonData.data.weight,
          type:pokemonData.data.types.map((type) => type.type.name)
        };
      })
    );
  
    return apiInfo;
  };

  const getDbInfo = async () =>{
    return await Pokemon.findAll({
        include:{
            model:Type,
            attributes:['name']
        }
    })
}

const getAllPokemons = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get('/',async (req,res)=>{
    const name = req.query.name
    const pokemonsTotal = await getAllPokemons();
    if(name){
        const pokemonsname = await pokemonsTotal.filter(element => element.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
        pokemonsname.length ?
        res.status(200).send(pokemonsname):
        res.status(404).send("No se encontro el pokemon")
    }else{
        res.status(200).send(pokemonsTotal)
    }
})

router.post('/', async (req,res)=>{//!first i make the post with the information that comes to me from the body
  console.log(req.body);  
    const{
        name,
        image,
        health,
        attack,
        defense,
        speed,
        height,
        weight,
        type
        }=req.body;

    const existingPokemon = await Pokemon.findOne({where:{name}});

    if(existingPokemon){
        return res.status(400).send('El pokemon ingresado ya existe')
    }

    const pokemonsCreate = await Pokemon.create({//! then i create the pokemon
        name,
        image,
        health,
        attack,
        defense,
        speed,
        height,
        weight,
        createInDb:true
        
    });

    const typeDb = await Type.findAll({where:{name:type}})//! but the Type i find the occupation in the model that has all occupations
    pokemonsCreate.addType(typeDb)
    res.send('¡Pokemon creado con exito!')
})

router.get('/:idPokemon', async (req,res)=>{
  const idPokemon = req.params.idPokemon
  const pokemonsTotal = await getAllPokemons()
  if(idPokemon){
    const pokemon = await pokemonsTotal.filter(element => element.id == idPokemon)
    idPokemon.length?
    res.status(200).json(pokemon):
    res.status(404).send('No se encontro ese personaje')
  }
})  

 module.exports = router;