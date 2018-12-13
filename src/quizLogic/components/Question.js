import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MultiTextAnswer from './MultiTextAnswer';

import MultiChoice from './MultiChoice';

@inject('quizAssessmentStore')
@observer
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
    };

    this.quizStore = this.props.quizAssessmentStore;
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitButton(questionId, answerData, quesIndex) {
    this.quizStore.answeredQuestions[quesIndex] = {
      questionId,
      answerData,
    };
    this.quizStore.nextQuestion();
    this.quizStore.goBack(this.quizStore.counter);
    this.setState(this.quizStore.initialState);
    this.quizStore.multiAnswerArr = [];
    this.quizStore.multiChoiceIds = [];
  }

  backButton() {
    this.quizStore.counter--;
    this.quizStore.goBack(this.quizStore.counter);

    this.setState(this.quizStore.initialState);
  }

  inputType() {
    if (this.props.type === 'text') {
      let arrOfTxtBoxs = [];
      for (let j = 0; j < this.props.numOfExamples; j++) {
        arrOfTxtBoxs.push(j + 1);
      }

      return arrOfTxtBoxs.map((num, i) => (
        <div key={i} style={{ color: 'black' }}>
          <p>Example #{num}</p>
          <MultiTextAnswer
            numOfTextBox={this.props.numOfExamples}
            parentKey={i}
            num={num}
            handleChildStateChange={this.handleChange.bind(this)}
            value={this.state[`answer${num}`]}
          />
        </div>
      ));
    } else if (this.props.type === 'choice') {
      if (this.props.allowMultiple === 0) {
        return this.props.choice.map((choice, i) => (
          <div key={i} data-value={choice.choice_id}>
            <div
              className="multiple-choice"
              style={{ padding: '1em', width: '90%' }}
              onClick={(e) => {
                this.submitButton(
                  this.props.questionId,
                  {
                    answerType: 'multiple-choice',
                    choiceId: choice.choice_id,
                    answer: e.currentTarget.textContent,
                  },
                  this.quizStore.counter,
                );
              }}
            >
              {choice.value}
            </div>
          </div>
        ));
      } else if (this.props.allowMultiple === 1) {
        // let className = this.props.highlight
        //   ? 'multiple-choice'
        //   : 'multiple-choice-highlight';
        return this.props.choice.map((choice, i) => (
          <div key={i}>
            <MultiChoice
              multiKey={i}
              data-value={choice.choice_id}
              choice={choice}
            />
          </div>
        ));
      }
    }
  }

  dangerousHTML() {
    return { __html: this.props.question };
  }

  nonDangerousHTML() {
    return <div>{this.props.question}</div>;
  }

  showSubmitButton() {
    if (this.props.type === 'text') {
      return (
        <button
          style={{
            marginTop: '0.5em',
            border: '0.5px black solid',
            backgroundColor: 'lightgrey',
            color: 'black',
            marginLeft: '1em'
          }}
          onClick={() => {
            this.submitButton(
              this.props.questionId,
              {
                answerType: 'text',
                numOfExamples: this.props.numOfExamples,
                answer_text_1: this.state.answer1,
                answer_text_2: this.state.answer2,
                answer_text_3: this.state.answer3,
                answer_text_4: this.state.answer4,
                answer_text_5: this.state.answer5,
                answer_text_6: this.state.answer6,
                timeAnswered: this.quizStore.time,
              },
              this.quizStore.counter,
            );
          }}
        >
          Submit
        </button>
      );
    } else if (this.props.allowMultiple === 1) {
      return (
        <button
        style={{
          margin: '0.5em',
          border: '0.5px black solid',
          backgroundColor: 'lightgrey',
          color: 'black',
          marginLeft: '1em',
        }}
          onClick={() => {
            this.submitButton(
              this.props.questionId,
              {
                answerType: 'multi-select',
                answers: this.quizStore.multiAnswerArr.join(','),
                choiceIds: this.quizStore.multiChoiceIds.join(','),
                timeAnswered: this.quizStore.time,
              },
              this.quizStore.counter,
            );
          }}
        >
          Submit
        </button>
      );
    }
  }

  render() {
    let htmlRegex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/.test(
      this.props.question,
    );

    if (htmlRegex) {
      return (
        <div style={{ paddingLeft: '1em', paddingRight: '1em'}}>
          <h4 dangerouslySetInnerHTML={this.dangerousHTML()} />
          <div>{this.inputType(this.props.instructions)}</div>
          {this.props.questionId === 1 ? (
            <div />
          ) : (
            <button
              style={{ color: 'black', border: '1px solid black' }}
              onClick={this.backButton.bind(this)}
            >
              Go Back
            </button>
          )}
          {this.props.type === 'text' || this.props.allowMultiple === 1 ? (
            this.showSubmitButton()
          ) : (
            <div />
          )}
        </div>
      );
    } else {
      return (
        <div style={{ paddingLeft: '1em' }}>
          <h4>{this.nonDangerousHTML()}</h4>
          <div className="options-table" style={{ width: '100%' }}>
            {this.inputType()}
          </div>
          {this.props.questionId === 1 ? (
            <div />
          ) : (
            <button style={{ color: 'black', border: '1px solid black'}} onClick={this.backButton.bind(this)}>Go Back</button>
          )}
          {this.props.type === 'text' || this.props.allowMultiple === 1 ? (
            this.showSubmitButton()
          ) : (
            <div />
          )}
        </div>
      );
    }
  }
}

export default Question;
