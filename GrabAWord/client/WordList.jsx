WordList = React.createClass({

  mixins: [ReactMeteorData],

  propTypes: {
    boardId: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    var handle = Meteor.subscribe('wordsByUserInBoard', this.props.boardId, this.props.userId);
    return {
      userWords: BoardWords.find().fetch()
    };
  },

  render() {

    var divStyle = {
      paddingTop: 25
    };

  	if (!this.data.userWords) {
  		return (
  			<LoadingSpinner />
  		);
  	}

  	let words = [];
  	this.data.userWords.forEach( w => {
  		words.push(<div><b>{w.word}</b>  - {w.points} points</div>);
  	});

  	return (
  		<div style={divStyle} className="wordListContainer">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">Grabbed Words</h3>
          </div>
          <div className="panel-body">
            {words}
          </div>
        </div>
      </div>
  	);
  }

});
