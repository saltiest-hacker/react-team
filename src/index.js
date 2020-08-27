import React from 'react'
import reducer from './state/reducer'
import App from './App'
import thunk from 'redux-thunk'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import './App.css'

const DOCUMENT = document.querySelector('#root')
const STORE = createStore(reducer, applyMiddleware(thunk))
STORE.subscribe(()=>console.log(STORE.getState()))
render(<Provider store={STORE}>
    <App/>
</Provider>,
DOCUMENT)