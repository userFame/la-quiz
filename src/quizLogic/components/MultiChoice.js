import React, { Component } from 'react';
import {inject, observer} from 'mobx-react'

@inject('quizAssessmentStore')
@observer
class MultiChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: false,
    };
  }

  multiChoiceArrRules(event, choiceId) {
    let multiAnswerArr = this.props.quizAssessmentStore.multiAnswerArr;
    let multiChoiceIds = this.props.quizAssessmentStore.multiChoiceIds
    if (multiAnswerArr.find((obj) => obj.choiceId === choiceId)) {
      let takeoutIndex = multiAnswerArr.findIndex(
        (obj) => obj.choiceId === choiceId,
      );
        multiAnswerArr.splice(takeoutIndex, 1);
    } else {
      multiChoiceIds.push(choiceId)
      multiAnswerArr.push(event.currentTarget.textContent)
    }
  }

  render() {
    return (
      <div key={this.props.key} data-value={this.props.choice.choice_id}>
        <div
          style={{
            // padding: '0.5em',
            width: '90%',
            color: 'black',
            border: '1px solid black',
            padding: '1em', 
          }}
          className={
            this.state.highlight
              ? 'multiple-choice-highlight'
              : 'multiple-choice'
          }
          onClick={(e) => {
            if (this.state.highlight) {
              this.setState({
                highlight: false,
              });
            } else {
              this.setState({
                highlight: true,
              });
            }
            this.multiChoiceArrRules(e, this.props.choice.choice_id);
          }}
        >
          {this.props.choice.value}
        </div>
      </div>
    );
  }
}

export default MultiChoice