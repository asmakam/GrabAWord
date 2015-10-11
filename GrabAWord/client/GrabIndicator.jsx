GrabIndicator = React.createClass({
  propTypes: {
    state: React.PropTypes.string.isRequired
  },

  render() {
    switch(this.props.state){
      case 'na':
        // Not applicable, nothing grabbed yet
        return <div></div>
        break;
      case "waiting":
        // for server response
        return <div><p> ... </p></div>
        break;
      case "success":
        // successfully accepted by server
        return <div><p> :) </p></div>
        break;
      case "fail":
        // rejected by server
        return <div><p> :( </p></div>
        break;


      default:
        return <div></div>
    }
  }
});
