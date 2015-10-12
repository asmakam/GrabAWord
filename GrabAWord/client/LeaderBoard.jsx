LeaderBoard = React.createClass({

  mixins: [ReactMeteorData],

  propTypes: {
    boardId: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    var leaderboardUsersHandle = Meteor.subscribe('leaderboardUsers', this.props.boardId);
    var leaderboardResultsHandle = Meteor.subscribe('latestBoard');
    var leaderboard = [];
    var users = [];

    if(leaderboardUsersHandle.ready()) {
      users = Meteor.users.find().fetch();
    }

    if(leaderboardResultsHandle.ready()) {
      leaderboard = Boards.findOne().results;
    }

    return {
      leaderboard: leaderboard,
      users: users
    };
  },

  render() {

    var leaders = [];

      if ((this.data.leaderboard) && (this.data.users)) {
        let orderedBoard = _.sortBy(this.data.leaderboard,'points').reverse();
        // This one is ideally not necessary for some reason user data is not getting refreshed
        this.data.users = Meteor.users.find().fetch();

        orderedBoard.forEach( l => {
          let userNameObj = _.findWhere(this.data.users,{ _id: l._id });
          if(userNameObj) {
            leaders.push(
                <LeaderRow  name = {userNameObj.username}  points={l.totalPoints} />
              );
            leaders.push(<LineBreak key={userNameObj.username}/>)
          }
        }.bind(this));
      }

      return (

              <div>
                <div className="panel panel-warning">
                  <div className="panel-heading">
                    <h1 className="panel-title">Leader Board</h1>
                  </div>
                  <div className="panel-body">
                    <div className="col-xs-12 table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaders}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
          );
  }

});


LeaderRow = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    points: React.PropTypes.string.isRequired
  },

  render() {

    return(
      <tr>
        <th scope="row">1</th>
        <td>{this.props.name}</td>
        <td>{this.props.points} </td>
      </tr>
    );

  }

});
