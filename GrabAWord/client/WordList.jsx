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

  	if (!this.data.userWords) {
  		return (
  			<LoadingSpinner />
  		);
  	}

  	let words = [];
  	this.data.userWords.forEach( w => {
  		words.push(<div>{w.word} ({w.points})</div>);
  	});
  	
  	return (
  		<div className="wordListContainer">
  			<div>Words</div>
  			{words}
  		</div>
  	);
  }

});
