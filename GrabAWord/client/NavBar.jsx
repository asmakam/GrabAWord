NavBar = React.createClass({
  render() {
    var divStyle = {
      color: 'white'
    };

    return (
      <div style={divStyle} className="navbar navbar-inverse">
        <div className="navbar-inner">
          <div className="container">
            <div className="row">
              <div className="col-xs-3 text-center">
                <Timer />
              </div>
              <div className="col-xs-6 text-center">
                <h3>Grab A Word!</h3>
              </div>
              <div className="col-xs-3 text-center">
                <AccountsUIWrapper />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
