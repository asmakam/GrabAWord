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

  grabSelectedWord(){
    //TODO - clear selection, post to server
    //TODO - how to show feedback if word was invalid? (valid words will show up on right)
  },

  tileClicked(event){
    //TODO - toggle tile
    //TODO - add/remove from CurrentSelection (State?)
  },

  render() {
    var rows = [];
    for(var hInd=0; hInd<this.data.height; hInd++){
      var row = [];
      for(var wInd=0; wInd<this.data.width; wInd++){
        var tileInd = hInd*this.data.height+wInd; // row major
        var tileAlphabet = this.data.letters[tileInd];
        row.push(<Tile
            key      = {tileInd}
            alphabet = {tileAlphabet}
            enabled  = {true}
            onClick  = {this.tileClicked}
            />);
      }
      rows.push(<LineBreak/>);
      rows.push(row);
    }
    rows.push(<LineBreak/>);

    return (
      <div className="boardContainer">
        <CurrentSelection/>
        {rows}
        <br></br>
        <button onClick={this.grabSelectedWord()}>Grab!</button>
    	</div>
    );
  }
});


Tile = React.createClass({
    render(){
      if(this.props.enabled) //For board
        return <button key = {this.props.key} onClick={this.props.onClick}>{this.props.alphabet}</button>
      else // To show current selection
        return <button key = {this.props.key} disabled>{this.props.alphabet}</button>
    }
});


LineBreak = React.createClass({
  //TODO - this causes 
  // Warning: Each child in an array or iterator should have a unique "key" prop.
  render(){
    return <br></br>
  }
});


CurrentSelection = React.createClass({
  // TODO - use Tile(s) with enabled={false}
  render(){
    return(
      <div className="CurrentSelection">

      </div>
    )
  }
});
