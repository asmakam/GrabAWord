GrabIndicator = React.createClass({
  propTypes: {
    state: React.PropTypes.string.isRequired
  },

  render() {
    var divStyle = {
      marginTop: 10,
      marginBottom: 10,
      fontSize: '3em',
      height: 30
    };

    switch(this.props.state[0]){
      case 'na':
        // Not applicable, nothing grabbed yet
        return <div style={divStyle} className="indicatorContainer text-center"><p> </p></div>
        break;
      case "waiting":
        // for server response
        return <div style={divStyle} className="indicatorContainer text-center"><p> ... </p></div>
        break;
      case "success":
        // successfully accepted by server
        return <div style={divStyle} className="indicatorContainer text-center"><p> :) </p></div>
        break;
      case "beaten":
        // someone else beat you to it
        var divStyle = {
          marginTop: 10,
          marginBottom: 10,
          fontSize: '1em',
          height: 30
        };
        return <div style={divStyle} className="indicatorContainer text-center"><p>Beaten by {this.props.state[1]} </p></div>
        break;
      case "incorrect":
        // incorrect word made
        return <div style={divStyle} className="indicatorContainer text-center"><p>x</p></div>
        break;


      default:
        return <div style={divStyle} className="indicatorContainer text-center"><p> </p></div>
    }
  }
});
