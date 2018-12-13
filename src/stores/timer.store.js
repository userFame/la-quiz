import { observable, action } from "mobx";

class TimerStore {
  @observable time = 60;

  @action
  countdown = () => {
    setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        clearInterval(this.countdown)
      }
    }, 1000);

  };

//   stopCountdown = () => {
//     clearInterval(this.countdown)
//   }
}

export default new TimerStore();
