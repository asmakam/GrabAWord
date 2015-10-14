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

    if(this.props.state.constructor === Array){
      var status = this.props.state[0];
      var username = this.props.state[1];
    }else{
      var status = this.props.state;
      var username = '';
    }

    switch(status){
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
          fontSize: '2em',
          height: 30
        };
        return <div style={divStyle} className="indicatorContainer text-center"><p>Beaten by {username} </p></div>
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
