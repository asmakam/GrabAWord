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
    const GAMETIME = 60; // seconds
    const LEADERBOARDTIME = 15; //seconds

    if(this.data.ticker){
      if(this.data.ticker.showBoard){
        // Game play
        return (
           <div>
            <h2> {GAMETIME - this.data.ticker.tickCount} </h2>
          </div>
        )
      }else{
        // Leader board
        return (
           <div>
            <h2>{LEADERBOARDTIME + GAMETIME - this.data.ticker.tickCount} </h2>
          </div>
        )

      }
    }
    // No timer (maybe when page is loading)
    return (<div><label> -- </label></div>);
  }
});
