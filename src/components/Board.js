import React from 'react';
import {Square} from './Square';


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


export default Board;
//export {Board};