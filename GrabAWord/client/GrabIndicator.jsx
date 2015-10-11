GrabIndicator = React.createClass({
  propTypes: {
    state: React.PropTypes.string.isRequired
  },

  render() {
    switch(this.props.state){
      case "waiting":
        return <div><p> ... </p></div>
        break;
      case "success":
        return <div><p> :) </p></div>
        break;
      case "fail":
        return <div><p> :( </p></div>
        break;
      default:
        return <div><p> ... </p></div>
    }
  }
});
