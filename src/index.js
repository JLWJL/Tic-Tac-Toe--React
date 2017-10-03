import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game';

/// React without ES6 in this file
var createReactClass = require('create-react-class');

var StartForm = createReactClass({

  getInitialState: function() {
    return{
      isClicked:false,
    };
  },
  
  //If no name provided, can't start game
  handleClick: function() {
    let input = document.getElementsByTagName('input')[0].value;
    
    if (input){
      this.setState({isClicked:true});
      console.log("HH: ",this.state.isClicked);
    }
    else{
      alert("Please enter your name");
    }
  },

  render: function(){

    if(this.state.isClicked){
     return <Game />
    
    }else{
      return(
        <form>
          <input type="text" placeholder="your name is ..."/>
          <button onClick={this.handleClick}>
            Start game
          </button>
        </form>
      );
    }
  },
});


ReactDOM.render(
  <StartForm />,
  document.getElementById('root')

);


