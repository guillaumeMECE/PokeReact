import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./style.css"


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import axios from 'axios';

export default class PokemonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Pokemon: [],
            PokemonToShow: [],
            isLoad: false,
            isRedirect: false,

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
                color = "#9bcc50";
                break;
            case "Bug":
                color = "#729f3f";
                break;
            case "Psychic":
                color = "#f366b9";
                break;
            case "Fire":
                color = "#fd7d24"
                break;
            case "Water":
                color = "#4592c4"
                break;
            case "Ice":
                color = "#51c4e7";
                break;
            case "Flying":
                color = "#92ace0"
                break;
            case "Poison":
                color = "#b97fc9"
                break;
            case "Ghost":
                color = "#7b61a2"
                break;
            case "Electric":
                color = "#eed535";
                break;
            case "Rock":
                color = "#a38c21"
                break;
            case "Normal":
                color = "#a4acaf"
                break;
            case "Fighting":
                color = "#d56723"
                break;
            case "Ground":
                color = "#d87843"
                break;
            case "Dragon":
                color = "#036dc4"
                break;

            default:
                color = "#036dc4"
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
                            <Badge className="ml-2" style={{ backgroundColor: this.renderTypeColor(type), color: "white" }} key={index}>{type}</Badge>
                        ))}
                    </Col>
                    <Col></Col>
                </Row>
                <Row className="my-5">
                    <Col>
                        <Image src={pokemon.img} rounded />
                    </Col>
                    <Col>
                        <Row className="mx-3 infoBox" style={{ backgroundColor: this.renderTypeColor(pokemon.type[0]), color: "white" }} >
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

    redirectToPokedex() {
        this.setState({
            isRedirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.isRedirect) {
            return <Redirect to={`/pokemon`} />
        }
    }

    render() {
        return (
            <div>
                <Button variant="outline-primary" onClick={() => { this.redirectToPokedex() }}>Return Home</Button>
                {this.renderRedirect()}
                <div className="PokemonInfo mx-auto" id="grid_list">

                    {this.state.isLoad ?
                        this.renderPokemonInfo(this.state.PokemonToShow)

                        : <Spinner animation="border" />
                    }

                </div>
            </div>
        );
    }
}
