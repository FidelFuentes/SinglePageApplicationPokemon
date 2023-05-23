import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styles from './Detail.module.css'

const Detail = () => {
    const { detailId } = useParams()
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        const URL_BASE = 'http://localhost:3001/pokemon'

        fetch(`${URL_BASE}/${detailId}`)
            .then((response) => response.json())
            
            .then((poke) => { setPokemon(poke) })
            
    }, [detailId]);

    return (
        <div className={styles.container}>
            {
                pokemon.name ? (
                    <div className={styles.cont}>
                        <h1> {pokemon.name} </h1>
                        <h2> Vida: {pokemon.life} </h2>
                        <h2> Ataque: {pokemon.attack} </h2>
                        <h2> Defensa: {pokemon.defense} </h2>
                        <h2> Velocidad: {pokemon.speed} </h2>
                        <h2> Altura: {pokemon.height} </h2>
                        <h2> Peso: {pokemon.weight} </h2>
                        <h2> Tipo: {pokemon && pokemon.types && pokemon.types.join(", ")} </h2>
                        
                        {console.log(pokemon.image)}
                       
                        <img src={pokemon.image.startsWith('http') ? pokemon.image : `http://localhost:3001/${pokemon.image}`} alt={pokemon.name} />


                        

                    </div>
                ) : (
                    
                 <h3>Loading...</h3>
                    
                )
            }
        </div>
    )
}

export default Detail

