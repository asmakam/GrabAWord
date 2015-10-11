Timer = React.createClass({

  mixins: [ReactMeteorData],


  getMeteorData() {
    var handle = Meteor.subscribe('timerInfo');
    var ticker = {};
    ticker = GameTimer.findOne();
    return {
      ticker:ticker
    };
  },

  render() {

    //TODO - how to have global constants? (see in GrabAWord.jsx)
    const GAMETIME = 10; // seconds
    const LEADERBOARDTIME = 5; //seconds

    if(this.data.ticker){
      if(this.data.ticker.showBoard){
        // Game play
        return (
           <div>
            <label> {this.data.ticker.tickCount} </label>
          </div>
        )
      }else{
        // Leader board
        return (
           <div>
            <label>New game in {LEADERBOARDTIME + GAMETIME - this.data.ticker.tickCount} </label>
          </div>
        )

      }
    }
    // No timer (maybe when page is loading)
    return (<div><label> -- </label></div>);
  }
});
