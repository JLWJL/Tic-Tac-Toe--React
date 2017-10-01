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
3. Pass down ```style``` to ```<a>```` 