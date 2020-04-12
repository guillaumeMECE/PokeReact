import React, { Component } from 'react'
import "./style.css"

import CardDeck from 'react-bootstrap/CardDeck';
import Card, { CardBody } from 'react-bootstrap/Card';

import axios from 'axios';

const CARD_PER_ROW = 5;
const ROW_PER_LOADING = 10;
// const PAGE = 1;

export default class GridList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Page: 0,
            Pokemon: [],
            PokemonToShow: [],
            isLoad: false
        };
    }

    componentDidMount() {
        this.fetchData();
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    async fetchData() {
        try {
            const { data } = await axios.get("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
            this.setState({ Pokemon: data.pokemon });

            console.log("Data", this.state.Pokemon[0].img);
            this.loadPokemonToShow();

        } catch (error) {
            console.log('ERROR MESSAGE :', error.message);
            console.log('ERROR :', error);
        }
    };

    loadPokemonToShow() {
        console.log("x1");
        this.setState({ isLoad: false });
        this.setState({Page: this.state.Page+1})
        console.log("PAGE", this.state.Page);
        console.log("x2");
        this.setState({ PokemonToShow: this.state.Pokemon.slice(0, CARD_PER_ROW * ROW_PER_LOADING * this.state.Page) });
        console.log("x3");
        console.log("DataToShow", this.state.PokemonToShow);
        console.log("DataNOTToShow", this.state.Pokemon);
        console.log("x4");
        this.createGridRender();
    }

    createGridRender() {
        const items = []
        const rowNumber = this.state.PokemonToShow.length / CARD_PER_ROW;

        for (let index = 0; index < rowNumber; index++) {
            items.push(this.state.PokemonToShow.slice(index * CARD_PER_ROW, index * CARD_PER_ROW + CARD_PER_ROW));
        }
        this.setState({ PokemonToShow: items });
        this.setState({ isLoad: true });
        console.log("DataToShow : ", this.state.PokemonToShow);
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('grid_list');
        if (this.isBottom(wrappedElement)) {
            console.log('header bottom reached');
            // document.removeEventListener('scroll', this.trackScrolling);
            this.loadPokemonToShow();
        }
    };

    render() {

        return (

            <div className="GridList" id="grid_list">
                {this.state.isLoad ?
                    this.state.PokemonToShow.map((row, index) => (
                        <CardDeck key={index} className="my-3">
                            {row.map((pokemon, index) => (
                                <Card key={index}>
                                    <Card.Img className="w-75 mx-auto" variant="top" src={pokemon.img} />
                                    <Card.Body className="p-0"></Card.Body>
                                    <Card.Footer>
                                        {pokemon.name}
                                    </Card.Footer>
                                </Card>
                            ))}
                        </CardDeck>
                    ))
                    : "Loading content..."
                }
            </div>
        );
    }
}
