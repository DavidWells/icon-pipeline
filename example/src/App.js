import React, { Component } from 'react'
import Icon from './components/Icon'
import sprite from './icons/sprite'
import addSVGtoDOM from './components/Icon/addSVGtoDOM'
import './App.css'

export default class App extends Component {
  componentDidMount() {
    addSVGtoDOM(null, sprite)
  }
  render() {
    return (
      <div className="App">
        <h1>Icons</h1>
        <Icon name='facebook' />
      </div>
    )
  }
}
