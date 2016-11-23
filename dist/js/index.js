class HelloMessage extends React.Component {
  render() {
    return(
    		React.createElement("div", {className: "flexbox"}, 
				React.createElement("h2", null, "I'm  a react component."), 
				React.createElement("p", null, "Find me from \"root\"/js/indes.jsx")
			)
		);
  }
}

const mountNode = document.getElementById('root');
ReactDOM.render(React.createElement(HelloMessage, null), mountNode);

//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
