NavBar = React.createClass({
  render() {
    var divStyle = {
      color: 'white',
      textAlign: 'center'
    };

    return (
      <div style={divStyle} className="navbar navbar-inverse">
        <div className="navbar-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 col-sm-12">
                <h1>Grab A Word!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
