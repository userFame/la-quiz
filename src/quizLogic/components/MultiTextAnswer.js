import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@inject('quizAssessmentStore')
@observer
class MultiTextAnswer extends Component {

  render() {
    if (this.props.numOfTextBox === 3) {
      return (
        <div>
          <textarea
            key={this.props.thisKey}
            name={`answer${this.props.num}`}
            onChange={(e) => {
              this.props.handleChildStateChange(e);
            }}
            rows="2"
            className='skills-assessment-multitext'
            placeholder="Type Your Answer Here..."
            id="text_answer"
            style={{
              // width: '90%',
              // maxWidth: '50%',
              border: '1px solid black',
              color: 'black',
              fontSize: '20px',
              resize: 'none'
            }}
            value={this.props.value}
          />
        </div>
      );
    } else if (this.props.numOfTextBox === 6) {
      return (
        <textarea
          className='skills-assessment-multitext'
          key={this.props.thisKey}
          name={`answer${this.props.num}`}
          onChange={(e) => {
            this.props.handleChildStateChange(e);
          }}
          rows="2"
          placeholder="Type Your Answer Here..."
          id="text_answer"
          style={{
            // width: '90%',
            // maxWidth: '90%',
            border: '1px solid black',
            color: 'black',
            fontSize: '20px',
            resize: 'none'
          }}
          value={this.props.value}
        />
      );
    } else {
      return (
        <textarea
          key={this.props.thisKey}
          name={`answer${this.props.num}`}
          onChange={(e) => {
            this.props.handleChildStateChange(e);
          }}
          rows="2"
          className='skills-assessment-multitext'
          placeholder="Type Your Answer Here..."
          id="text_answer"
          style={{
            border: '1px solid black',
            color: 'black',
            fontSize: '20px',
            resize: 'none'
          }}
          value={this.props.value}
        />
      );
    }
  }
}

export default MultiTextAnswer;
