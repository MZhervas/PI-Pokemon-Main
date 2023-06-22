import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import {postPokemons,getTypes} from '../actions/index';
import { useDispatch,useSelector } from "react-redux";
import './pokemonCreate.css'

export default function PokemonCreate(){
    const dispatch = useDispatch()
    const history =useHistory()
    const types = useSelector((state)=>state.types)

    const [input,setInput] = useState({
        name:"",
        image:"",
        health:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        type:[]
    })
    const [errors, setErrors] = useState({});

    function handleChange(event){// cada ves que ejecutes esta funcion
        setInput({//a mi estado input, ademas de lo que tiene, agregale el target value de lo que este modificando
            ...input,
            [event.target.name]:event.target.value.toLowerCase()// aca hago que el usuario no pueda poner mayusculas al nombre
        })
        console.log(input);
    }
    
    function handlerSubmit(event) {
        event.preventDefault();
        if (validateForm()) {
          dispatch(postPokemons(input));
          alert("¡Pokemon creado!");
          setInput({
            name: "",
            image: "",
            health: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            type: []
          });
          history.push('/home');
        }
      }

    function handleSelect(event){
        setInput({
            ...input,
            type:[...input.type,event.target.value]
        })
    }

    function validateForm() {
        let isValid = true;
        const errors = {};
    
        if (input.name.trim() === "" ) {
          errors.name = "Debe ingresar un nombre.";
          isValid = false;
        }
    
        if (input.health.trim() === ""|| input.health.trim() <= 0) {
          errors.health = "Debe ingresar una vida valida.";
          isValid = false;
        }
    
        if (input.attack.trim() === "" || input.attack.trim() <= 0) {
          errors.attack = "Debe ingresar un ataque valido.";
          isValid = false;
        }
    
        if (input.defense.trim() === "" || input.defense.trim() <= 0) {
          errors.defense = "Debe ingresar una defensa valida.";
          isValid = false;
        }
    
        if (input.speed.trim() === ""|| input.speed.trim() <= 0) {
          errors.speed = "Debe ingresar una velocidad valida.";
          isValid = false;
        }
    
        if (input.height.trim() === "" || input.height.trim() <= 0) {
          errors.height = "Debe ingresar una altura valida.";
          isValid = false;
        }
    
        if (input.weight.trim() === "" || input.weight.trim() <= 0) {
          errors.weight = "Debe ingresar un peso valido. ";
          isValid = false;
        }
    
        if (input.image.trim() === "") {
          errors.image = "Debe ingresar una imagen.";
          isValid = false;
        }
    
        setErrors(errors);
        return isValid;
      }

    useEffect(()=>{
        dispatch(getTypes())
    },[])

    function handleDelete(element){
        setInput({
            ...input,
            type:input.type.filter(type =>type !== element)
        })
    }

    return(
        <div className="container">
            <Link to='/home'><button>Volver</button></Link>
            <h1>¡Crea tu Pokemon!</h1>
            <form onSubmit={(event)=> handlerSubmit(event)}>
                <div>
                    <label>Nombre </label>
                    <input type="text"
                    value={input.name} 
                    name="name"
                    onChange={handleChange}/>
                    {errors.name && <span>{errors.name}</span>} 
                </div>
                <div>
                    <label>Vida </label>
                    <input type="number"
                    value={input.health}
                    name="health" 
                    onChange={handleChange}/>
                    {errors.health && <span>{errors.health}</span>} 
                </div>
                <div>
                    <label>Ataque </label>
                    <input type="number"
                    value={input.attack} 
                    name="attack"
                    onChange={handleChange}/>
                     {errors.attack && <span>{errors.attack}</span>}
                </div>
                <div>
                    <label>Defensa </label>
                    <input type="number"
                    value={input.defense}
                    name="defense" 
                    onChange={handleChange}/>
                     {errors.defense && <span>{errors.defense}</span>} 
                </div>
                <div>
                    <label>Velocidad </label>
                    <input type="number"
                    value={input.speed}
                    name="speed"
                    onChange={handleChange} />
                     {errors.speed && <span>{errors.speed}</span>} 
                </div>
                <div>
                    <label>Altura </label>
                    <input type="number"
                    value={input.height}
                    name="height"
                    onChange={handleChange} />
                     {errors.height && <span>{errors.height}</span>} 
                </div>
                <div>
                    <label>Peso </label>
                    <input type="number"
                    value={input.weight}
                    name="weight"
                    onChange={handleChange} />
                    {errors.weight && <span>{errors.weight}</span>} 
                </div>
                <div>
                    <label>Imagen </label>
                    <input type="text"
                    value={input.image}
                    name="image" 
                    onChange={handleChange}/>
                    {errors.image && <span>{errors.image}</span>} 
                </div>
                <select onChange={(event) => handleSelect(event)}>
                    {types.map((type)=>(
                        <option value={type.name}>{type.name}</option>
                    ))}
                </select>

                <ul><li>{input.type.map(element=>element + " ,")}</li></ul>
                
                <button type='submit'>¡Hacelo realidad!</button>
            </form>
            {input.type.map(element=>
                <div className="divType">
                <p>{element}</p>
                <button className="botonX" onClick={()=>handleDelete(element)}>x</button>
                </div>
                )}
        </div>
    )
}