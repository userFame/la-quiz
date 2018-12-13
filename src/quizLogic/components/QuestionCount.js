import React from 'react';

const QuestionCount = (props) => {
  return (
    <div style={{ paddingLeft: '1em'}}>
      <h4>
        Question <span>{props.count}</span> of{' '}
        <span>{props.questionTotal}</span>
      </h4>
    </div>
  );
};

export default QuestionCount;
