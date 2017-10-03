import React from 'react';
import Board from './Board';
import {calculateWinner,getPosition} from '../Helpers.js';

export default class Game extends React.Component{
  constructor(){
    super();
    this.state={
      history: [{
        squares:Array(9).fill(null),
        position:[0,0],
      }],
      player:null,
      stepNumber:0,
      xIsNext:true,
      isAscend:true
    }
  }

  render(){

    let status =""
    const history = this.state.history.slice();
    const squares = history[this.state.stepNumber].squares;
    

    const moves = history.map((record, index)=>{

      const style = 
      {
        fontWeight:index==this.state.stepNumber?"bold":"normal"
      };

      const move = index===0? "Game start":"Move #"+index+"-"+(record.player)+" "+record.position;

      return(
        <li key={index}>
          <a href = "#" style={style} onClick={()=>this.jumpTo(index)}>{move}</a>
        </li>
      );
    });

    //Check if there's a win
    const hasWinner = calculateWinner(squares);
    if(hasWinner){
      status = "Winner: "+hasWinner.winner;
    }
    else{
      status = "Next player is "+(this.state.xIsNext?"X":"O");
    }

    return(
      <div className="game">
        <div className="game-board">
          <Board 
            onClick = {(i)=>this.handleClick(i)}
            squares = {this.state.history[this.state.stepNumber].squares}
            winLine = {hasWinner} //Might be null; Go to renderSquare in Board
          />
        </div>
        <div className="game-info">
          <button onClick={()=>this.handleSortClick()}>
            {this.state.isAscend?"Desend":"Ascend"}
          </button>
          <div>{ status }</div>
          <ol>{ this.state.isAscend? moves: moves.reverse() }</ol>
        </div>
      </div>
    );
  }

  /**
  * 1. Mark the square
  * 2. Determine if there is a win
  * 3. Update state
  */
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const currentStep = history[history.length-1];
    const squares = currentStep.squares.slice();
    
    if(calculateWinner(squares)|| squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext ? "X":"O";
    
    this.setState({
      history:history.concat([{
        squares:squares,
        position:getPosition(i),
        player:this.state.xIsNext ? "X":"O",
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }


  jumpTo(step){
    this.setState(
      {
        stepNumber: step,
        xIsNext: step%2===0
      }
    );
  }

  handleSortClick(){
    this.setState({
      isAscend:!this.state.isAscend
    });
  }
}