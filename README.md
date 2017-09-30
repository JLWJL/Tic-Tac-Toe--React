#  Notes during the study

## Concepts:

### Functional Component:
Components that only consist of render() can be simplified as 
```javascript
function xx(props){
  return(...);
}
```

### Controlled Component:
Component like **Board** that controls children's states

### [render():](https://reactjs.org/docs/react-component.html#render)
render() returns a **React element**, which is a lightweight description of what to render.

render() should be pure:
1. It does not modify component state
2. It returns the same result each time it’s invoked
3. It does not directly interact with the browser. 


### [constructor():](https://reactjs.org/docs/react-component.html#constructor)
1. The place to initialise 'state'
2. Always call 'super()' at the first
3. Can be ignored if not state to be intialised


### [keys:](https://reactjs.org/tutorial/tutorial.html#keys)
```key``` is a special **reserved** property that is used by React to distinguish different elements. It cannot be referenced with ```this.props.key```.
