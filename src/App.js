import React, { Component } from 'react';

import Quize from './Quize/Quize';
import {progerDayQuize} from './quize.data';

import './App.css';

class App extends Component {
    render() {
        return <Quize quize={progerDayQuize}/>;
    }
}

export default App;
