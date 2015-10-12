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
      users = Players.find().fetch();
    }

    /*
    Meteor.call('getPlayers', (err, res) => {
          this.data.users = res;
        }.bind(this));
    */

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

      if (this.data.leaderboard.length && this.data.users.length) {
        let orderedBoard = _.sortBy(this.data.leaderboard,'totalPoints').reverse();
        orderedBoard.forEach( l => {
          let userNameObj = _.findWhere(this.data.users,{ idx: l._id });
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
                <label> Leader Board </label>
              <div className="row">
                {leaders}
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
      <p> {this.props.name} --- {this.props.points} </p>
    );

  }

});