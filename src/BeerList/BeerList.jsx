import React from 'react';

export default class BeerList extends React.Component {
    state = {
        beers: null
    }

    componentDidMount() {
        this.loadData(this.props.beerName);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.beerName !== this.props.beerName) {
            this.setState({
                beers: null
            }, () => this.loadData(this.props.beerName));
        }
    }

    // loadData(beerName) {
    //     if (beerName) {
    //         fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`)
    //             .then(response => response.json())
    //             .then(beers => {
    //                 if (this.props.beerName === beerName) {
    //                     this.setState({beers, beerName});
    //                 }
    //             })
    //             .catch(ex => console.error(ex));
    //     }
    // }

    async loadData(beerName) {
        async function getData(beerName) {
            return fetch(`https://api.punkapi.com/v2/beers?beer_name=${beerName}`);
        }

        if (beerName) {
            const response = await getData(beerName),
                beers = await response.json();

            if (this.props.beerName === beerName) {
                this.setState({beers, beerName});
            }
        }
    }

    renderBeerItem = beer => {
        return <li>
            {beer.name};
        </li>;
    }

    render() {
        const {beers} = this.state,
            {beerName} = this.props;

        return <ul className='beer-list'>
            {!beers &&
                <li>
                    {`loading beers for "${beerName}"`}
                </li>}
            {beers && beers.map(this.renderBeerItem)}
        </ul>;
    }
}
