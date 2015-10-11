Game = React.createClass({
  /*
     Uncomment when needed
    mixins: [ReactMeteorData],

    getMeteorData() {

    },
  */

  render() {
    return (
      <div className="container">

        <AccountsUIWrapper />

        <Timer />

        <Board />

    	</div>
    );
  }
});
