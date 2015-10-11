Timer = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    ticker: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {}
  },

  getMeteorData() {
    var handle = Meteor.subscribe('timerInfo');
    var ticker = {};
    if(handle.ready()) {
      ticker = MyTimer.find();
    }
    return ticker;
  },
  
  render() {
    return (
      <div>
        <label> {this.data.ticker? this.data.ticker.tickCount : <p>Timer Loading...</p>} </label>
      </div>
      );
  }  

});

//