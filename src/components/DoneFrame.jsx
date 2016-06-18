var React = require('react');

var DoneFrame = React.createClass({
  propTypes: {
    status: React.PropTypes.string,
    replay: React.PropTypes.func
  },
  render: function() {
    return(
      <div className="well text-center">
        <h2>{this.props.status}</h2>
        <button className="btn btn-default" onClick={this.props.replay}>Play Again</button>
      </div>
    );
  }
});

module.exports = DoneFrame;
