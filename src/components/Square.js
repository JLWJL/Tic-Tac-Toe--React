import React from 'react';



export function Square(props){
	
	let styles = {backgroundColor:'#00bcd4'}
	let colour = props.label === 'X'? ' mark-X':' mark-O';
  return(
    <button className={"square"+colour} style={props.isWinSquare? styles:null} onClick = {()=> props.onClick()}>
      {props.label}
    </button>
  );
}