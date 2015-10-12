LeaderBoard = React.createClass({

  mixins: [ReactMeteorData],

  propTypes: {
    boardId: React.PropTypes.string.isRequired
  },

  getMeteorData() {
    let leaderboardUsersHandle = Meteor.subscribe('leaderboardUsers', this.props.boardId);
    let leaderboardResultsHandle = Meteor.subscribe('latestBoard');
    let leaderboard = [];
    let users = [];

   
    
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
    
   
   
    return (
      <div>
        <label> Leader board information </label>
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