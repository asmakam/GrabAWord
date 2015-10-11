GrabIndicator = React.createClass({
  propTypes: {
    smile: React.PropTypes.bool.isRequired
  },

  render() {
    if (this.props.smile) {
      return (
        <p> :) </p>
      );
    }
    return (
      <p>  :( </p>
    );
  }

});
