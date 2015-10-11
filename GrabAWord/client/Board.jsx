Board = React.createClass({
  /*
     Uncomment when needed
    mixins: [ReactMeteorData],

    getMeteorData() {

    },
  */

  render() {
    const WIDTH = 4; // tiles
    const HEIGHT = 5; // tiles

    var rows = [];
    for(var hInd=0; hInd<HEIGHT; hInd++){
      var row = [];
      for(var wInd=0; wInd<WIDTH; wInd++){
        row.push('Tile');
      }
      rows.push(row);
    }

    return (
      <div className="boardContainer">
    		<p> Board </p>
        {rows}
        <Tile/>
    	</div>
    );
  }
});


Tile = React.createClass({
    render(){
      return <button>{this.props.alphabet}</button>
    }
});
