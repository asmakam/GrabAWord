Timer = React.createClass({
  
  mixins: [ReactMeteorData],

  propTypes: {
    ticker: React.PropTypes.object.isRequired
  },

  getMeteorData() {
    var handle = Meteor.subscribe('timerInfo');
    var ticker = {};
    if(handle.ready()) {
      arr = MyTimer.find().fetch();
      ticker = arr[0];
      //debugger;
      console.log(ticker);
    }
    return {
      ticker:ticker
    };
  },
  
  render() {
    if (!this.data.ticker) {
      return <div> Timer loading .... </div>
    }

    return (
      <div>
        <label> {this.data.ticker.tickCount} </label>
      </div>
      );
  }  

});