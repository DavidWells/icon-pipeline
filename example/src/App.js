import React, { Component } from 'react'
import Icon from './components/Icon'
import sprite from './icons/sprite'
import iconList from './icons/icon-list.json'
import addSVGtoDOM from './components/Icon/addSVGtoDOM'
import './App.css'

export default class App extends Component {
  componentDidMount() {
    addSVGtoDOM(null, sprite)
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1>Single Icon</h1>
          <Icon name='facebook' />
        </div>
        <div>
        <h1>Icons List</h1>
          <div>
            {Object.keys(iconList).map((icon) => {
              return <Icon name={icon} />
            })}
          </div>
        </div>
      </div>
    )
  }
}
