NavBar = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var handle = Meteor.subscribe('BoardUsers', this.props.boardId);
    var b = BoardWords.find().fetch();
    return {
      numplayers:_.uniq(b,function(d){return d.user}).length
    };
  },

  render() {
    var divStyle = {
      color: 'white'
    };

    return (
      <div style={divStyle} className="navbar navbar-inverse">
        <div className="navbar-inner">
          <div className="container">
            <div className="row">
              <div className="col-xs-3 text-center">
                <Timer />
              </div>
              <div className="col-xs-6 text-center">
                <h3>Grab A Word!</h3>
                <sub>Current players: {this.data.numplayers}</sub>
              </div>
              <div className="col-xs-3 text-center">
                <AccountsUIWrapper />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
