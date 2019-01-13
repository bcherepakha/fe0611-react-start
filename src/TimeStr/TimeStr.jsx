import React from 'react';
import PropTypes from 'prop-types';

export default class TimeStr extends React.Component {
    static defaultProps = {
        date: ''
    }

    static propTypes = {
        date: PropTypes.string
    }

    static getDerivedStateFromProps(props, state) {
        const {date} = props;

        return {
            date: new Date(date)
        };
    }

    state = {}

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {};
    // }

    getBeautifulDate() {
        const {date} = this.state;

        return [
            date.getDate().toString().padStart(2, '0'),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getFullYear()
        ].join('.');
    }

    render() {
        const {date} = this.props;

        return <time
            className="quize-date"
            dateTime={date}>
            {this.getBeautifulDate()}
        </time>;
    }
}
