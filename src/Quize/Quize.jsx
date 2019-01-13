import React from 'react';
import PropTypes from 'prop-types';

import TimeStr from '../TimeStr/TimeStr';
import {checkResults} from '../quize.data';

import './Quize.css';

const PropTypesAnswer = PropTypes.shape({
    quize_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    question_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    answer_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
});

const PropTypesQuestion = PropTypes.shape({
    quize_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    question_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypesAnswer).isRequired
});

export default class Quize extends React.Component {
    static defaultProps = {
        quize: {}
    }

    static propTypes = {
        quize: PropTypes.shape({
            quize_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            title: PropTypes.string.isRequired,
            date: PropTypes.string,
            image: PropTypes.string,
            description: PropTypes.string,
            questions: PropTypes.arrayOf(PropTypesQuestion).isRequired
        })
    }

    static getDerivedStateFromProps(props, state) {
        return {
            quizeLength: props.quize.questions.length
        }
    }

    state = {
        currentQuestion: 0,
        quizeStarting: false,
        quizeEnds: false,
        results: {
            sucess: 0
        }
    }

    startQuize = () => {
        this.setState({
            quizeStarting: true
        });
    }

    nextQuestion = () => {
        this.setState(prevState => ({
            currentQuestion: prevState.currentQuestion + 1,
            quizeEnds: prevState.currentQuestion + 1 === prevState.quizeLength
        }));
    }

    retrie = () => {
        this.setState(prevState => ({
            currentQuestion: 0,
            quizeEnds: false,
            results: {
                sucess: 0
            }
        }));
    }

    chooseAnswer({quize_id, question_id, answer_id}) {
        return () =>
            this.setState(prevState => {
                const result = checkResults({quize_id, question_id, answer_id}),
                    newState = {
                        ...prevState,
                        results: {
                            ...prevState.results,
                            [question_id]: result
                        }
                    };

                // prevState.results[question_id] = result;
                // return prevState;

                if (result.status === 'sucess') {
                    newState.results.sucess++;
                }

                return newState;
            })
    }

    renderResults() {
        const {quizeLength, results: {sucess}} = this.state;

        return <div className="quize__result">
            <div className="quize__result-status">
                {`${sucess}/${quizeLength}`}
            </div>
            <div className="quize__action">
                <button
                    onClick={this.retrie}
                    className="quiz__button">Попробовать еще</button>
            </div>
        </div>;
    }

    renderQuizeAnswer(answer, questionResult) {
        const {text, quize_id, question_id, answer_id} = answer,
            classNames = ['quiz__answer'],
            additionalParams = {};

        if (!questionResult) {
            additionalParams.onClick = this.chooseAnswer({quize_id, question_id, answer_id});
        }

        if (questionResult && questionResult.answer_id === answer_id) {
            classNames.push(`quiz__answer--${questionResult.status}`);
        } else if (questionResult && questionResult.answer_id !== answer_id) {
            classNames.push(`quiz__answer--not-choosen`);
        }

        return <div
            key={answer_id}
            className={classNames.join(' ')}
            {...additionalParams}>
            <div className="quiz__answer-text">
                {text}
            </div>
            {questionResult &&
                questionResult.answer_id === answer_id &&
                <div className="quiz__answer-descr">
                    {questionResult.message}
                </div>}
            {questionResult && questionResult.percents &&
                <div className="quiz__answer-percent">
                    {`${questionResult.percents[answer_id]}%`}
                </div>}
        </div>;
    }

    renderQuizeItem() {
        const {currentQuestion, results} = this.state,
            {questions} = this.props.quize,
            {question_id, text, answers} = questions[currentQuestion],
            questionResult = results[question_id];

        return <div className="quiz__item">
            <div className="quiz__question">
                {text}
            </div>
            {answers.length > 0 &&
                <div className="quiz__answers">
                    {answers.map(a => this.renderQuizeAnswer(a, questionResult))}
                </div>}
            {questionResult &&
                <div className="quize__action">
                    <button
                        onClick={this.nextQuestion}
                        className="quiz__button">Дальше</button>
                </div>}
        </div>;
    }

    render() {
        const {title, date, image, description} = this.props.quize,
            {quizeStarting, quizeEnds} = this.state;

        return <article className="quize">
            <div className="quize-header">
                <h1 className="quize-title">
                    {title}
                </h1>
                {date &&
                    <div className="quize-meta">
                        <ul>
                            <li>
                                <TimeStr date={date}/>
                            </li>
                        </ul>
                    </div>}
            </div>
            {image &&
                <div className="quize__entry-image-wrapper">
                    <img
                        alt=''
                        src={image}
                        className="quize__entry-image"/>
                </div>}
            <div className="quize__entry-container">
                {description &&
                    <div className="quize__entry-content">
                        {description}
                    </div>}
                <div className="quize__progress_block">
                    <div className="quize__progress" data-role="progress">
                    </div>
                </div>
                <hr/>
                {!quizeStarting &&
                    <div className="quize__action">
                        <button
                            className="quiz__button"
                            onClick={this.startQuize}>
                            Начать тест
                        </button>
                    </div>}
            </div>
            {quizeStarting && !quizeEnds && this.renderQuizeItem()}
            {quizeEnds && this.renderResults()}
        </article>;
    }
}
