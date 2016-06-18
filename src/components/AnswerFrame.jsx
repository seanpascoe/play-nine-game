var React = require('react');

var AnswerFrame = React.createClass({
  propTypes: {
    selected: React.PropTypes.array,
    unselectNumber: React.PropTypes.func
  },
  render: function() {
    var props = this.props;
    var selectedNums = this.props.selected.map(function(num, key) {
      return (
        <span key={key} onClick={props.unselectNumber.bind(null, num)}>{num}</span>
      );
    });
    return (
      <div id="answer-frame">
        <div className="well">
          {selectedNums}
        </div>
      </div>
    );
  }
});


module.exports = AnswerFrame;
