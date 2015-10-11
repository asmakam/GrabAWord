Board = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
      return { selectedWord: '',
               selectedTiles: []};
    },

    getMeteorData() {
      var user = Meteor.user();
      var handle = Meteor.subscribe('latestBoard');
      return {
          user: user,
          width: 4,
          height: 5,
          board: Boards.findOne(),
          userId: Meteor.userId()
      };
    },

  grabSelectedWord(event){

    // TODO - call server method
    // 	grabWord(word, board, user)
    let boardId = (this.data.board) ? this.data.board._id: "";
    let userId = (this.data.user) ? this.data.userId: "";
    Meteor.call('grabWord',this.state.selectedWord, boardId, userId);

    // Clear display label and reenable tiles for clicking
    this.state.selectedWord = '';
    React.findDOMNode(this.refs.textInput).innerHTML = this.state.selectedWord;

    // Re enable tiles and initialize to pick next word
    for(var idx = 0; idx < this.state.selectedTiles.length; idx++) {
      this.state.selectedTiles[idx].disabled = false;
    }
    this.state.selectedTiles = [];

    //TODO - how to show feedback if word was invalid? (valid words will show up on right)
    //  post to server
  },

  tileClicked(event){
    this.state.selectedWord = this.state.selectedWord + event.target.innerHTML;
    React.findDOMNode(this.refs.textInput).innerHTML = this.state.selectedWord;

    // Disable the tile
    event.target.disabled = true;
    // Store the event references to these targets to enable them in future
    this.state.selectedTiles.push(event.target);

    // Take care to use tileInds(key) (since letters could repeat)
  },

  render() {

    if (!this.data.board) {
      return <LoadingSpinner />;
    }

    var rows = [];
    let {tiles} = this.data.board;
    for(var hInd=0; hInd<this.data.height; hInd++){
      var row = [];
      for(var wInd=0; wInd<this.data.width; wInd++){
        var tileInd = hInd*(this.data.height-1)+wInd; // row major
        var tileAlphabet = tiles[tileInd];
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

    let boardId = (this.data.board) ? this.data.board._id: "";
    let userId = (this.data.user) ? this.data.userId: "";

    return (
      <div className="boardContainer">
        <label ref="textInput"> </label> <br> </br>
        {rows}
        <br></br>
        <GrabButton enabled={this.data.user} onClick={this.grabSelectedWord}/>
        <WordList boardId={boardId} userId={userId} />
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
