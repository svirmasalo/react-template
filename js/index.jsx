class HelloMessage extends React.Component {
  render() {
    return(
    		<div className="flexbox">
				<h2>I'm  a react component.</h2>
				<p>Find me from "root"/js/indes.jsx</p>
			</div>
		);
  }
}

const mountNode = document.getElementById('root');
ReactDOM.render(<HelloMessage />, mountNode);

//# sourceMappingURL=index.js.map