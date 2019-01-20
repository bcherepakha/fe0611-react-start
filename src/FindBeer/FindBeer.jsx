import React from 'react';

class FindBeer extends React.Component {
    state = {
        beerName: ''
    }

    changeInput = e => {
        const {value} = e.target;

        this.setState({
            beerName: value
        });
    }

    submitHandler = e => {
        e.preventDefault();
        const {beerName} = this.state;

        this.setState({
            beerName: ''
        }, () => {
            if (this.props.submitHandler) {
                this.props.submitHandler(beerName);
            }
        });
    }

    render() {
        const {beerName} = this.state;

        return <form onSubmit={this.submitHandler}>
            <input
                type='text'
                value={beerName}
                onChange={this.changeInput}/>
            <button type='submit'>
                Search
            </button>
        </form>
    }
}

export default FindBeer;
