import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//class Square extends React.Component {
	
function Square(props){
	// handleClick = () => {
	// 	this.setState({value:'X'});
 //  };

  //render() {
    return (
      <button className="square" onClick={props.onClick}>
       {/*Avoid {alert('xxx')}*/}
        {props.label}	{/*read passed-in param*/}
      
      </button>
    );
  //}
}


/**
* Board class is called 'controlled component'
* It controlls the state of the children
*/

class Board extends React.Component {
	renderSquare(i) {
    return (
      <Square 
      label={this.props.squares[i]} // label is passed-in param
      onClick={()=>this.props.onClick(i)} />  
    );
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  
  constructor(){
    super();
    this.state={
      history:[{
        squares:Array(9).fill(null)
      }],

      xIsNext:true
    };
  }


  handleClick(i){
    const history = this.state.history; //[{squares:...}]
    const current = history[history.length - 1]; //{squares:...}
    const squares = current.squares.slice(); //'slice' -> copy array, avoid mutability

    //squares[i] avoids changes on existing value of the square
    if(calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xIsNext?"X":"O";
      
    this.setState({
      history:history.concat([{
        squares:squares,
      }]),
      xIsNext:!this.state.xIsNext
    }); //Calling 'setState' will update the component

  } 

  render() {
    const history = this.state.history; //[{squares:...}]
    const current = history[history.length - 1]; //{squares:...}
    const winner = calculateWinner(current.squares);

    let status;
    if(winner){
      status = "Winner is " + winner;
    }else{
      status = "Next player is " + (this.state.xIsNext? "X":"O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board  
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }


}


/**
* Helper functions
*/
function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for(let i = 0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
