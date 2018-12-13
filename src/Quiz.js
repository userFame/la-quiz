import React from "react";
import { inject, observer } from "mobx-react";

import QuizQuestions from "./quizLogic/QuizQuestions";

import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from "./common/Button";

@inject("quizAssessmentStore")
@inject("timerStore")
@observer
class QuizAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startQuiz: false,
      fullScreen: true,
      quizEnd: false,
      cheated: false,
      sawWarning: false,
      afterWarning: false
    };

    this.quizStore = this.props.quizAssessmentStore;
    this.settingsStore = this.props.settingsStore;
    this.timerStore = this.props.timerStore;
  }

  startQuizSection() {
    this.setState({
      startQuiz: true
    });
  }

  instructions() {
    return (
      <div>
        <p>
          This quiz's logic was written for Loyal Assistant using React and Mobx
          <br />
          <strong style={{ fontWeight: "bold", color: "black" }}>
            {" "}
            You will have 1 minute to complete the quiz.{" "}
          </strong>
          <br />
          <strong style={{ fontWeight: "bold", color: "red" }}>
            if you click on another tab or application, your quiz will end!
          </strong>
        </p>
        <br />
        <button
          style={{
            fontSize: "16px",
            color: "white",
            backgroundColor: "rgb(48, 204, 185)"
          }}
          onClick={() => {
            this.startQuizSection();
          }}
        >
          Start Quiz!
        </button>
      </div>
    );
  }

  outOfTimeDialog() {
    return (
      <Dialog
        aria-labelledby="out-of-time-dialog"
        open={this.state.startQuiz}
      >
        <DialogTitle>Time has expired</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can take it again if you'd like. This isn't even a real quiz so
            you're good!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button title={"PHEW!"} onClick={() => window.location = '/'}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  completedQuizDialog() {
    return (
      <Dialog
        aria-labelledby="out-of-time-dialog"
        aria-describedby="out-of-time-description"
        open={this.state.startQuiz}
      >
        <DialogTitle>You have completed the Quiz!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click on the button below to take again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button title="Again!" onClick={() => (window.location = "/")} />
        </DialogActions>
      </Dialog>
    );
  }

  beginQuiz() {
    if (!document.hasFocus() && this.state.afterWarning)
      this.setState({ cheated: true });
    return (
      <Dialog
        aria-labelledby="quiz-dialog-fullScreen"
        aria-describedby="quiz-dialog-fullScreen-description"
        className="quiz-dialog-fullScreen"
        open={this.state.startQuiz}
        fullScreen={this.state.fullScreen}
      >
        <Dialog
          aria-labelledby="quiz-dialog-warning"
          aria-describedby="quiz-dialog-warning-description"
          className="quiz-dialog-warning"
          open={this.state.startQuiz && !this.state.sawWarning}
          style={{ color: "black" }}
          onExited={() => {
            this.setState({
              afterWarning: true
            })
            this.timerStore.countdown();
          }}
        >
          <DialogTitle style={{ color: "red" }}>
            Make sure that you <span style={{ color: "red" }}>DO NOT</span> exit
            the quiz for any reason. The quiz will end if you choose to open a
            new browser tab, existing tab, or another application. Clock starts
            when you click the button below.
          </DialogTitle>
          <DialogActions>
            <Button
              title="begin"
              onClick={() => this.setState({ sawWarning: true })}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <QuizQuestions questionsArray={this.quizStore.apiQuestions} />
      </Dialog>
    );
  }

  quizTaken() {
    return (
      <div style={{ color: "black" }}>
        You have completed the Skills Assessment Section!
        <br />
        <br />
        <Button
          title="Save & Continue"
          onClick={() =>
            this.props.history.push("/professional/account/schedule")
          }
        />
      </div>
    );
  }

  render() {
    if (this.state.cheated === true) {
      return (
        <div>
          <Dialog
            aria-labelledby="out-of-time-dialog"
            aria-describedby="out-of-time-description"
            open={this.state.startQuiz}
          >
            <DialogTitle>
              <div style={{ color: "red" }}>
                You have opened a new tab or application! You tried to cheat!
                You should be ashamed!
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Thankfully this quiz isn't going to affect the outcome of your
                life and is made for demonstration purposes. But not cheating is
                a good way for you to stay out of trouble, in any situation of
                life. So please, remember...DONT CHEAT! You're better than that!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                title="I promise I wont do it again!"
                onClick={() => (window.location = "/")}
              />
            </DialogActions>
          </Dialog>
          <div style={{ color: "black" }}>Dont be a cheater!</div>
        </div>
      );
    } else if (
      this.quizStore.counter === this.quizStore.apiQuestions.length
    ) {
      return (
        <div>
          {this.completedQuizDialog()}
          <div style={{ color: "black", paddingTop: "2em" }}>
            You have completed the Assessment!
          </div>
        </div>
      );
    } else if (this.timerStore.time > 0) {
      return (
        <div>
          {!this.state.startQuiz ? this.instructions() : this.beginQuiz()}
        </div>
      );
    } else if (this.timerStore.time <= 0 || this.quizStore.apiQuestions.length < 4) {
        // this.timerStore.stopCountdown()
      return (
        <div>
          {this.outOfTimeDialog()}
          <div style={{ color: "black" }}>
            Time's Up! At least you didn't cheat...right?
          </div>
        </div>
      );
    }
  }
}

export default QuizAssessment;
