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
      tickCount = MyTimer.findOne().tickCount;
    }
    return ticker;
  },
  
  render() {

    if (!this.data.ticker) {
      //return <LoadingSpinner />;
      return <div> Timer loading .... </div>
    }

    return (
      <div>
        <label> {this.data.tickCount} </label>
      </div>
      );
  }  

});

//