Timer = React.createClass({
  
  mixins: [ReactMeteorData],

  propTypes: {
    ticker: React.PropTypes.object.isRequired
  },

  getMeteorData() {
    var handle = Meteor.subscribe('timerInfo');
    var ticker = {};
    ticker = MyTimer.findOne();
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
        <label> {60 - this.data.ticker.tickCount} </label>
      </div>
   );
  }  

});