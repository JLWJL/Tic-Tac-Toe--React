import React from 'react';

export function Square(props){
	
	let styles = {backgroundColor:'#00bcd4'}
  return(
    <button className="square" style={props.isWinSquare? styles:null} onClick = {()=> props.onClick()}>
      {props.label}
    </button>
  );
}