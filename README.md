## This branch is the enhanced version of the tutorial
[Check it here](https://ryanwng.github.io/Tic-Tac-Toe--React/)

### Enhanced functions

#### Highlight winning squares

1. In ```calculateWinner()```, return winning ```lines[i]``` as winning squares.

2. In ```render()``` of ```Game```, pass down ```hasWinner``` as ```winLine``` to ```Board```.  ```hasWinner``` might or might not be null, which will be dealt with in ```Board```

3. In ```renderSquare(i)``` of ```Board```, check whether ```props.winLine``` has value. If yes, then check if current ```i``` is one of the winning square. If yes, variable ```isWinSquare = true```. Pass it to ```Square```

4. In ```Square``` define a highlight style ```styles```. Assign it to ```style``` property in ```button``` according to the value of ```isWinSquare```

#### Bold the selected/current steps
This is to find, when rendering moves list, the index of history that matches the ```stepNumber```

1. Define a ```style``` object that contains the ```fontWeight``` style.
2. Compare the history index with ```this.state.stepNumber```, by which assign value to ```fontWeight```.
3. Pass down ```style``` to ```<a>``` 


#### Display player and move position
Store information and move position in ```state``` of each history.

1. Add ```position``` in ```history``` and ```player``` in ```state```
2. Add function ```getPosition``` to calculate the coordinates of the clicked square by ```i``` passed in ```handleClick```.
3. In ```this.setState```, set ```position``` and ```player```. ```player``` is determined by ```this.state.xIsNext ? "X":"O"```


#### Add a toggle button that lets you sort the moves in either ascending or descending order.

In ```render()``` of ```Game```, ```moves``` is a returned array of ```<li>``` elements. The order of the array can be adjusted by ```Array.reverse()```

1. Define a new state ```isAscend``` in ```Game```
2. Define a function ```handleSortClick``` in ```Game```, which just set state of ```isAsend```
3. Add a ```button``` and assign ```handleSortClick``` to it. Text of the button is determined by value of ```this.state.isAscend```
4. When displaying moves list, it also depends on value of ```this.state.isAscend```