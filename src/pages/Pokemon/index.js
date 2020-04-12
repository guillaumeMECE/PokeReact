import React from 'react';
import './style.css';
import PokemonInfo from '../../components/pokemonInfo';

function Pokemon(props) {
    console.log("PROPPS : ",props.match.params.name);
    
    return (
        <div className="Home">
            <h1>PokeReact</h1>
            <PokemonInfo pokemon={props.match.params.name}/>
        </div>
    );
}

export default Pokemon;
