import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component{
  render(){
    let styles = {backgroundColor:'#00bcd4'}
    return(
      <button className="square" style={this.props.isWinSquare? styles:null} onClick = {()=> this.props.onClick()}>
        {this.props.label}
      </button>
    );
  }
}


class Board extends React.Component{
  renderSquare(i){
    let isWinSquare = false;
    //Check if there is a win
    const hasWinSquares = this.props.winLine;

    //If yes, check if current square is one of them
    if(hasWinSquares){
      if(hasWinSquares.winSquares.indexOf(i)>-1){
        isWinSquare = true
      }
    }
    return(
      <Square
        key={i}
        label = {this.props.squares[i]}
        onClick = {()=>this.props.onClick(i)}
        isWinSquare = {isWinSquare}
      />
    );
  }

  render(){
    // Use loops to create squares
    let rows = [];
    for(let r=0; r<3; r++){
      let square = [];
      for(let s=0; s<3; s++){
        square.push(this.renderSquare(s+r*3));
      }
      rows.push(<div key={r} className="board-row">{square}</div>);

    };
      
    return(
      <div>
        {rows}
      </div>
    );
  }
}


class Game extends React.Component{
  constructor(){
    super();
    this.state={
      history: [{
        squares:Array(9).fill(null),
        position:[0,0],
      }],
      stepNumber:0,
      xIsNext:true
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
          <div>{ status }</div>
          <ol>{ moves }</ol>
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
}


ReactDOM.render(
  <Game/>,
  document.getElementById('root')

);


function getPosition(i){
  let x = Math.floor(i%3)+1;
  let y = Math.floor(i/3)+1

  return [x,y]
}


function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){ 

      return  {
        winner:squares[a],
        winSquares:lines[i]
      }

    }
  }

  return null;
}















// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {/* TODO */}
//       </button>
//     );
//   }
// }

// class Board extends React.Component {
//   renderSquare(i) {
//     return <Square />;
//   }

//   render() {
//     const status = 'Next player: X';

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// // ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );