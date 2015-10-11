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
      case "beaten":
        // someone else beat you to it
        return <div><p> :( </p></div>
        break;
      case "incorrect":
        // incorrect word made
        return <div><p>x</p></div>
        break;


      default:
        return <div></div>
    }
  }
});
