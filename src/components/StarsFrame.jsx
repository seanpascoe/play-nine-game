var React = require('react');

var StarsFrame = React.createClass({
  propTypes: {
    numberOfStars: React.PropTypes.number
  },
  render: function() {
    var starsArr = [];

    for (var i=0; i<this.props.numberOfStars; i++) {
      starsArr.push(<span key={i} className="glyphicon glyphicon-star"></span>);
    }

    return (
      <div id="stars-frame" className="well">
        {starsArr}
      </div>
    );
  }
});


module.exports = StarsFrame;
