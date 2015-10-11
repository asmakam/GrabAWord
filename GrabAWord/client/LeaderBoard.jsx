LeaderBoard = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return { };
  },

  render() {
    return (
      <div>
        <label> Leader board information </label>
      </div>
      );
  }

});
