import React, { Component } from 'react'
import "./style.css"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'

import axios from 'axios';

export default class PokemonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Pokemon: [],
            PokemonToShow: [],
            isLoad: false,

        };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const { data } = await axios.get("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
            this.setState({ Pokemon: data.pokemon });
            console.log("Data from DB", this.state.Pokemon);
            console.log("Data from URI", this.props.pokemon);
            this.loadPokemonToShow(this.props.pokemon);

        } catch (error) {
            console.log('ERROR MESSAGE :', error.message);
            console.log('ERROR :', error);
        }
    };

    loadPokemonToShow() {
        this.state.Pokemon.forEach(pokemon => {
            if (pokemon.name === this.props.pokemon) {
                this.setState({ PokemonToShow: pokemon });
            }
        });
        console.log("Data HEEERRRREEEE", this.state.PokemonToShow);
        this.setState({ isLoad: true });
    }

    renderTypeColor(type) {
        let color;
        switch (type) {
            case "Grass":
            case "Bug":
                color = "success"
                break;
            case "Psychic":
            case "Fire":
                color = "danger"
                break;
            case "Water":
                color = "primary"
                break;
            case "Flying":
                color = "info"
                break;
            case "Poison":
            case "Ghost":
                color = "dark"
                break;
            case "Electric":
            case "Ground":
                color = "warning"
                break;

            default:
                color = "light"
                break;
        }
        return color;
    }

    renderPokemonInfo(pokemon) {
        return (
            <div>
                <Row className="mt-5">
                    <Col><h2>{pokemon.name}</h2> </Col>
                    <Col><h2>#{pokemon.num}</h2></Col>
                </Row>
                <Row>
                    <Col>
                        {pokemon.type.map((type, index) => (
                            <Badge className="ml-2" variant={this.renderTypeColor(type)} key={index}>{type}</Badge>
                        ))}
                    </Col>
                    <Col></Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <Image src={pokemon.img} rounded />
                    </Col>
                    <Col>
                        <Row className="mx-3 infoBox" >
                            <Col>
                                <h5>height :</h5>{pokemon.height}
                            </Col>
                            <Col>
                                <h5>weight :</h5>{pokemon.weight}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>);
    }

    render() {

        return (

            <div className="PokemonInfo mx-auto" id="grid_list">

                {this.state.isLoad ?
                    this.renderPokemonInfo(this.state.PokemonToShow)

                    : <Spinner animation="border" />
                }

            </div>
        );
    }
}
