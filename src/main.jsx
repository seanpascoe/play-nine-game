var React = require('react');
var ReactDOM = require('react-dom');

var StarsFrame = require('./components/StarsFrame.jsx');
var ButtonFrame = require('./components/ButtonFrame.jsx');
var AnswerFrame = require('./components/AnswerFrame.jsx');
var NumbersFrame = require('./components/NumbersFrame.jsx');
var DoneFrame = require('./components/DoneFrame.jsx');


var Game = React.createClass({
  getInitialState: function() {
    return {
      numberOfStars: this.randomNumber(),
      selectedNumbers: [],
      correct: null,
      usedNumbers: [],
      redraws: 5,
      gameOverStatus: null
    }
  },
  randomNumber: function() {
    return Math.floor(Math.random() * 9) + 1
  },
  selectNumber: function(num) {
    if ( this.state.selectedNumbers.indexOf(num) < 0 && this.state.usedNumbers.indexOf(num) < 0) {
      this.setState({
        selectedNumbers: this.state.selectedNumbers.concat(num),
        correct: null
      });
    }
  },
  unselectNumber: function(num) {
    var selectedNumbers = this.state.selectedNumbers;
    var indexOfNumber = selectedNumbers.indexOf(num);

    selectedNumbers.splice(indexOfNumber, 1);

    this.setState({
      selectedNumbers: selectedNumbers,
      correct: null
    })
  },
  sumOfSelectedNumbers: function() {
    return this.state.selectedNumbers.reduce(function(p,n) {
      return p + n;
    }, 0)
  },
  checkAnswer: function() {
    var correct = (this.state.numberOfStars == this.sumOfSelectedNumbers())
    this.setState({
      correct: correct
    })
  },
  acceptAnswer: function() {
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers)
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: this.randomNumber()
    }, function() {
      this.updateGameStatus();
    });
  },
  redraw: function() {
    if(this.state.redraws > 0) {
      this.setState({
        redraws: this.state.redraws - 1,
        numberOfStars: this.randomNumber(),
        correct: null,
        selectedNumbers: []
      }, function() {
        this.updateGameStatus();
      });
    }
  },
  possibleSolutions: function() {
    var numberOfStars = this.state.numberOfStars;
    var possibleNumbers = [];
    var usedNumbers = this.state.usedNumbers;

    var possibleCombinationSum = function(arr, n) {
      if (arr.indexOf(n) >= 0) { return true; }
      if (arr[0] > n) { return false; }
      if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
      }
      var listSize = arr.length, combinationsCount = (1 << listSize)
      for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
          if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
      }
      return false;
    };

    for (var i = 1; i <= 9; i++) {
      if(usedNumbers.indexOf(i) < 0) {
        possibleNumbers.push(i);
      }
    }

    return possibleCombinationSum(possibleNumbers, numberOfStars)
  },
  updateGameStatus: function() {
    if (this.state.usedNumbers.length === 9) {
      this.setState({
        gameOverStatus: "You Win!"
      });
      return;
    }
    if (this.state.redraws === 0 && !this.possibleSolutions()) {
      this.setState({
        gameOverStatus: "You Lose!"
      });
      return;
    }
  },
  resetGame: function() {
    this.setState(this.getInitialState());
  },
  render: function() {
    var usedNumbers = this.state.usedNumbers;
    var selectedNumbers = this.state.selectedNumbers;
    var numberOfStars = this.state.numberOfStars;
    var correct = this.state.correct;
    var redraws = this.state.redraws;
    var gameOverStatus = this.state.gameOverStatus;
    var bottomFrame;

    if (gameOverStatus) {
      bottomFrame = <DoneFrame status={gameOverStatus}
                               replay={this.resetGame} />;
    } else {
      bottomFrame = <NumbersFrame selected={selectedNumbers}
                                  clickNumber={this.selectNumber}
                                  usedNumbers={usedNumbers} />;
    }

    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr/>
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars} />
          <ButtonFrame selected={selectedNumbers}
                       checkAnswer={this.checkAnswer}
                       correct={correct}
                       acceptAnswer={this.acceptAnswer}
                       redraw={this.redraw}
                       numRedraws={redraws} />
          <AnswerFrame selected={selectedNumbers}
                       unselectNumber={this.unselectNumber} />
        </div>
        {bottomFrame}
      </div>
    )
  }
});




ReactDOM.render(<Game />, document.getElementById('root'));
