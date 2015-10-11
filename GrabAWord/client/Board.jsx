Board = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      return {
          width: 4,
          height: 5,
          letters: ['A','B','C','D','E',
                    'F','G','H','I','J',
                    'K','L','M','N','O',
                    'P','Q','R','S','T',
                    'U','V','W','X','Y']
      };
    },

  render() {
    var rows = [];
    for(var hInd=0; hInd<this.data.height; hInd++){
      var row = [];
      for(var wInd=0; wInd<this.data.width; wInd++){
        var tileInd = hInd*this.data.height+wInd; // row major
        var tileAlphabet = this.data.letters[tileInd];
        row.push(<Tile alphabet={tileAlphabet}/>);
      }
      rows.push(<LineBreak/>);
      rows.push(row);
    }
    rows.push(<LineBreak/>);

    return (
      <div className="boardContainer">
        <p>[Currently selected tiles/word go here] (x -clear button to remove all selection)</p>
        {rows}
        <br></br>
        <button>Grab!</button>
    	</div>
    );
  }
});


Tile = React.createClass({
    render(){
      return <button>{this.props.alphabet}</button>
    }
});


LineBreak = React.createClass({
  render(){
    return <br></br>
  }
});
