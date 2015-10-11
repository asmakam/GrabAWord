Game = React.createClass({
  /*
     Uncomment when needed
    mixins: [ReactMeteorData],

    getMeteorData() {

    },
  */

  render() {
    return (
      <div className="container">
    		<p> Main Game </p>

        <Board />
        
    	</div>
    );
  }
});
