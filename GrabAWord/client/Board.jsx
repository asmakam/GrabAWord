Board = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      selectedWord: '',
      selectedTiles: [],
      grabbedWordStatus: 'na'
    };
  },

  getMeteorData() {
    var user = Meteor.user();
    var handle = Meteor.subscribe('latestBoard');
    return {
      user: user,
      width: 4,
      height: 5,
      board: Boards.findOne(),
      userId: Meteor.userId(),

    };
  },

  grabSelectedWord(event) {
      // --> Grab the word
      this.setState({ grabbedWordStatus: 'waiting'});
      Meteor.call('grabWord', this.state.selectedWord, this.data.board._id,
        this.data.userId, (err, res) => {
          this.setState({ grabbedWordStatus: res});
          let resetGrabIndicator = function(){
          this.setState({ grabbedWordStatus: 'na'});
          }.bind(this);
          Meteor.setTimeout(resetGrabIndicator,1000); //mseconds
      });

    // Clear display label and reenable tiles for clicking
    this.state.selectedWord = '';
    React.findDOMNode(this.refs.textInput).innerHTML = this.state.selectedWord;

    // Re enable tiles and initialize to pick next word
    for (var idx = 0; idx < this.state.selectedTiles.length; idx++) {
      this.state.selectedTiles[idx].state.enabled = true;
      this.state.selectedTiles[idx].getDOMNode().disabled = false;
    }
    this.state.selectedTiles = [];
  },

  tileClicked(event, tileInstance) {
    this.state.selectedWord = this.state.selectedWord + event.target.innerHTML;
    React.findDOMNode(this.refs.textInput).innerHTML = this.state.selectedWord;

    // Disable the tile
    event.target.disabled = true;

    // Store the event references to these targets to enable them in future
    this.state.selectedTiles.push(tileInstance);
  },

  render() {

    if (!this.data.board) {
      return <LoadingSpinner />;
    }

    var rows = [];
    let {
      tiles
    } = this.data.board;
    for (var hInd = 0; hInd < this.data.height; hInd++) {
      var row = [];
      for (var wInd = 0; wInd < this.data.width; wInd++) {
        var tileInd = hInd * (this.data.height - 1) + wInd; // row major
        var tileAlphabet = tiles[tileInd];
        row.push(
          <Tile
            ref          = {"tile"+tileInd}
            key          = {tileInd}
            alphabet     = {tileAlphabet}
            tileClicked  = {this.tileClicked}
            />
        );
      }
      rows.push(<LineBreak key={hInd}/>);
      rows.push(row);
    }
    rows.push(<LineBreak key="end"/>);
    let boardId = (this.data.board) ? this.data.board._id : "";
    let userId = (this.data.user) ? this.data.userId : "";
    return (
      <div className="boardContainer">
        <div ref="textInput" className="row">
        </div>

        <div className="row">
          {rows}
        </div>

        <div className="row">
          <GrabButton enabled={this.data.user} onClick={this.grabSelectedWord}/>
        </div>

        <div className="row">
          <GrabIndicator state={this.state.grabbedWordStatus} />
        </div>

        <div className="row">
          <WordList boardId={boardId} userId={userId} />
        </div>

      </div>
    );
  }
});


Tile = React.createClass({
  getInitialState() {
    return {
      enabled: true,
    };
  },

  onThisTileClick(event){
    // Post to parent
    this.props.tileClicked(event, this);
    // Toggle visual state
    this.setState({enabled: !this.state.enabled});
  },

  render() {
    if(this.state.enabled){
      // enabled button
      const btnStyle = {
        height: 50,
        border: ['1px outset white'],
        backgroundColor: 'transparent',
        fontSize: '2.5em'
      };
      return(
            <button style={btnStyle} id={this.props.ref} className="col-xs-3" key={this.props.key} onClick={this.onThisTileClick}>{this.props.alphabet}</button>
          );

    }else{
      // already selected
      const btnStyle = {
        height: 60,
        border: ['1px outset white'],
        backgroundColor: 'white',
        fontSize: '3em'
      };
      return(
            <button style={btnStyle} id={this.props.ref} className="col-xs-3" key={this.props.key} onClick={this.onThisTileClick}>{this.props.alphabet}</button>
          );
    }
  }
});


LineBreak = React.createClass({
  render() {
    return <br key = {this.props.key}></br>
  }
});


GrabButton = React.createClass({
  render() {
    var divStyle = {
      marginTop: 10
    };

    if (this.props.enabled)
      return (
        <div style={divStyle} className="col-xs-12">
          <button className="btn btn-default btn-lg btn-block" onClick={this.props.onClick}>Grab!</button>
        </div>
      );
    else
      return (
        <div style={divStyle} className="col-xs-12">
          <button disabled className="btn btn-default btn-lg btn-block"> Log in to play! </button>
        </div>
      );
  }
});
