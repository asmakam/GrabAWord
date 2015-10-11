Board = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      var user = Meteor.user();
      return {
          user: user,

          // TODO - replace with server call/collection with active board
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
    console.log('Grab!');
  },

  tileClicked(event){
    console.log('Tile clicked:' + event.target.innerHTML );
    //TODO - toggle tile
    // TODO - how to get the tile ind??
    //TODO - Take care to use tileInds(key) (since letters could repeat)
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
      rows.push(<LineBreak key={hInd}/>);
      rows.push(row);
    }
    rows.push(<LineBreak key="end"/>);

    return (
      <div className="boardContainer">
        <CurrentSelection/>
        {rows}
        <br></br>
        <GrabButton enabled={this.data.user} onClick={this.grabSelectedWord}/>
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
  render(){
    return <br key = {this.props.key}></br>
  }
});


GrabButton = React.createClass({
  render(){
    if(this.props.enabled)
      return <button onClick={this.props.onClick}>Grab!</button>
    else
      return<button disabled>Grab!</button>
  }
});


CurrentSelection = React.createClass({
  // TODO - use Tile(s) with enabled={false} to show selected tiles on the top
  render(){
    return(
      <div className="CurrentSelection">

      </div>
    )
  }
});
