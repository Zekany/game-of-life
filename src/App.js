import React, { Component } from 'react'
import Board from './Board'
import './App.css'
import bootstrap from '../node_modules/bootstrap-v4-master/dist/css/bootstrap.css'

class App extends Component {
  constructor () {
    super()
    // Change size of the board by modifying the width and height attributes in state
    this.state = {
      width: 40,
      height: 40,
      generations: 1,
      grid: []
    }
    this.createGrid = this.createGrid.bind(this)
    this.update = this.update.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.clear = this.clear.bind(this)
    this.toggleCell = this.toggleCell.bind(this)
  }

  componentWillMount () {
    this.createGrid(this.state.width, this.state.height)
  }

  createGrid () {
    let grid = []
    for (let i = 0; i < this.state.height; i++) {
      let row = []
      for (let j = 0; j < this.state.width; j++) {
        let rand = Math.random()
        // Change number of living cells by modifying the value below
        rand > 0.70 ? rand = 1 : rand = 0
        row.push(rand)
      }
      grid.push(row)
    }
    this.setState({grid: grid, generations: 1})
  }

  update () {
    let grid = this.state.grid
    let nextBoard = []
    for (let i = 0; i < this.state.height; i++) {
      let row = []
      nextBoard.push(row)
    }
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        let n = 0
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0){}
            else if (typeof grid[x + dx] !== 'undefined' &&
              typeof grid[x + dx][y + dy] !== 'undefined' &&
                     grid[x + dx][y + dy]) {
              n++
            }
          }
        }
        let c = grid[x][y]
        switch (n) {
          case 0:
          case 1:
            c = 0
            break
          case 2:
            break
          case 3:
            c = 1
            break
          default:
            c = 0
        }
        nextBoard[x][y] = c
      }
    }
    this.setState({grid: nextBoard, generations: this.state.generations + 1})
  }

  play () {
    this.update()
    window.t = requestAnimationFrame(this.play)
  }

  stop () {
    cancelAnimationFrame(window.t)
  }

  clear () {
    let clearGrid = []
    for (let i = 0; i < this.state.height; i++) {
      let row = []
      for (let j = 0; j < this.state.width; j++) {
        row.push(0)
      }
      clearGrid.push(row)
    }
    cancelAnimationFrame(window.t)
    this.setState({grid: clearGrid, generations: 0})
  }

  toggleCell (xCoord, yCoord) {
    let newGrid = this.state.grid
    if (newGrid[yCoord][xCoord] === 1) {
      newGrid[yCoord][xCoord] = 0
    } else {
      newGrid[yCoord][xCoord] = 1
    }
    this.setState({grid: newGrid})
  }

  render () {
    return (
      <div className='App container'>
        <div className='row justify-content-md-center'>
          <h5 className='gen-count'>Generation: {this.state.generations}</h5>
        </div>
        <div className='row justify-content-md-center'>
          <Board grid={this.state.grid} toggleCell={this.toggleCell}/>
        </div>
        <div className='row justify-content-md-center'>
          <button id='new' className='btn btn-sm' onClick={() => this.createGrid()}>New board</button>
          <button className='btn btn-sm' onClick={() => this.update()}>Next step</button>
          <button id='play' className='btn btn-sm' onClick={() => this.play()}>Play</button>
          <button id='stop' className='btn btn-sm' onClick={() => this.stop()}>Stop</button>
          <button id='clear' className='btn btn-sm' onClick={() => this.clear()}>Clear</button>
        </div>
      </div>
    )
  }
}

export default App
