GrabIndicator = React.createClass({
  propTypes: {
    smile: React.PropTypes.bool.isRequired
  },

  render() {
    if (this.props.smile) {
      return (
        <div><p> :) </p></div>
      );
    }
    return (
       <div><p> :( </p></div>
    );
  }

});
