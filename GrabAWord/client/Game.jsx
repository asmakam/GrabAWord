Game = React.createClass({
  
    // Uncomment when needed
    mixins: [ReactMeteorData],

    getMeteorData() {

    var handle = Meteor.subscribe('latestBoard');
    var thandle = Meteor.subscribe('timerInfo');
    var board = {};
    var ticker = {};

    if(handle.ready()) {
      board = Boards.findOne();
    }

    if(thandle.ready()) {
      ticker = GameTimer.findOne();
    }

    return {
      board: board,
      ticker: ticker,
     };

    },

  render() {
    return (
      <div className="container">

        <AccountsUIWrapper />
        
        <Timer />

        {this.data.ticker.showBoard ? <Board /> : <LeaderBoard />}

    	</div>
    );
  }
});
