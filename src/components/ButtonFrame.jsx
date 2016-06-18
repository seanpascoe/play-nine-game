var React = require('react');

var ButtonFrame = React.createClass({
  propTypes: {
    selected: React.PropTypes.array,
    checkAnswer: React.PropTypes.func,
    correct: React.PropTypes.bool,
    acceptAnswer: React.PropTypes.func,
    numRedraws: React.PropTypes.number,
    redraw: React.PropTypes.func
  },
  render: function() {
    var disabled;
    var button;
    var correct = this.props.correct;

    switch(correct) {
      case true:
        button = (
            <button className="btn btn-success btn-lg"
                    onClick={this.props.acceptAnswer}>
              <span className="glyphicon glyphicon-ok"></span>
            </button>
        )
        break;
      case false:
        button = (
            <button className="btn btn-danger btn-lg">
              <span className="glyphicon glyphicon-remove"></span>
            </button>
        )
        break;
      default:
        disabled = (this.props.selected.length === 0);
        button = (
            <button className="btn btn-primary btn-lg"
                    onClick={this.props.checkAnswer}
                    disabled={disabled}>
              =
            </button>
        )
    }
    return (
      <div id="button-frame">
        {button}
        <br/>
        <br />
        <button className="btn btn-warning btn-xs" onClick={this.props.redraw} disabled={this.props.numRedraws===0}>
          <span className="glyphicon glyphicon-refresh"></span>
          &nbsp;{this.props.numRedraws}
        </button>
      </div>
    );
  }
});


module.exports = ButtonFrame;
