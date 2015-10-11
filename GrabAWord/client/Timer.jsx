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
    if (!this.data.ticker) {
      return (<div><label> -- </label></div>);
    }


   return (
     <div>
        <label> {this.data.ticker.tickCount} </label>
      </div>
   );
  }

});
