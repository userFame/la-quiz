import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Timer from './components/Timer';
import QuestionCount from './components/QuestionCount';
import Question from './components/Question';


@inject('quizAssessmentStore')
@observer 
class QuizQuestions extends Component {


  callQuestion() {
    const questionIndex = this.props.quizAssessmentStore.counter;
    return ( 
        <Question
          questionsArray={this.props.questionsArray}
          questionOrder={this.props.questionsArray[questionIndex]._order}
          questionId={this.props.questionsArray[questionIndex].id}
          question={this.props.questionsArray[questionIndex].value}
          type={this.props.questionsArray[questionIndex].type}
          instructions={this.props.questionsArray[questionIndex].instructions}
          choice={this.props.questionsArray[questionIndex].choices}
          allowMultiple={
            this.props.questionsArray[questionIndex].allow_multiple
          }
          highlight={false}
          numOfExamples={this.props.questionsArray[questionIndex].num_of_examples}
        />
    );
  }

  render() {
    const questionIndex = this.props.quizAssessmentStore.counter;
    return (
      <div>
        <Timer />
        <QuestionCount
          count={this.props.questionsArray[questionIndex]._order}
          questionTotal={this.props.questionsArray.length}
        />
        <div>{this.callQuestion()}</div>
      </div>
    );
  }
}

export default QuizQuestions;
