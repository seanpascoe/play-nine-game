var React = require('react');

var NumbersFrame = React.createClass({
  propTypes: {
    selected: React.PropTypes.array,
    clickNumber: React.PropTypes.func,
    usedNumbers: React.PropTypes.array
  },
  render: function() {
    var numbers = [];
    var className;
    var selectedNumbers = this.props.selected;
    var clickNumber = this.props.clickNumber;
    var usedNumbers = this.props.usedNumbers;

    for(var i=1; i<=9; i++) {
      className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
      className += " used-" + (usedNumbers.indexOf(i)>=0)
      numbers.push(
        <div key={i} className={className} onClick={clickNumber.bind(null, i)}>{i}</div>
      );
    }
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
});


module.exports = NumbersFrame;
