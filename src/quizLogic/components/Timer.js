import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('timerStore')
@observer
class Timer extends Component {
  render() {
    const seconds = this.props.timerStore.time;
    return (
      <div style={{ color: 'black ', paddingLeft: '1em', paddingTop: '1em', width: '90%' }}>
        Time Remaining:{' '}
        <span>
          {Math.floor(seconds / 60)} :{' '}
          {Math.floor(seconds % 60) > 9
            ? Math.floor(seconds % 60)
            : `0${Math.floor(seconds % 60)}`}
        </span>
      </div>
    );
  }
}

export default Timer;
