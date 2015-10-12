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
      <div className="content">

        <NavBar />

        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-10 col-md-offset-3 col-xs-offset-1">
              {this.data.ticker.showBoard ? <Board /> : <LeaderBoard boardId = {this.data.board._id} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
