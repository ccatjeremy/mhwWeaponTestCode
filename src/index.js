import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import App, { NextQuestion, DATA,OUTCOME } from './App';
import * as serviceWorker from './serviceWorker';
import bg1 from './img/line.png';
import bg2 from './img/texture1.png';


ReactDOM.render(
    <NextQuestion  Data={DATA} OutCome={OUTCOME}/>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
