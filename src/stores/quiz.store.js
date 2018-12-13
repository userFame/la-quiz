import { observable, action } from "mobx";
import questions from './../apiQuestions'

class QuizAssessmentStore {

  @observable
  initialState = {
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
    answer6: ""
  };

  @observable counter = 0;

  // For Select All That Apply Questions
  @observable multiAnswerArr = [];
  @observable multiChoiceIds = [];

  @observable answeredQuestions = [];

  @observable afterWarning = false;

  @observable apiQuestions = questions


  @action
  nextQuestion = () => {
    if (this.counter < this.apiQuestions.length) {
      this.counter++;
    } else if (this.counter === this.apiQuestions.length) {
      console.log("Quiz Done!");
    }
  };

  @action
  goBack = ansQuesIndex => {
    if (
      this.answeredQuestions.length > this.counter &&
      this.answeredQuestions[ansQuesIndex].answerData.answerType === "text"
    ) {
      this.initialState = {
        answer1: this.answeredQuestions[ansQuesIndex].answerData.answer_text_1,
        answer2: this.answeredQuestions[ansQuesIndex].answerData.answer_text_2,
        answer3: this.answeredQuestions[ansQuesIndex].answerData.answer_text_3,
        answer4: this.answeredQuestions[ansQuesIndex].answerData.answer_text_4,
        answer5: this.answeredQuestions[ansQuesIndex].answerData.answer_text_5,
        answer6: this.answeredQuestions[ansQuesIndex].answerData.answer_text_6
      };
    } else if (
      this.answeredQuestions.length === this.counter
    ) {
      this.initialState = {
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answer5: "",
        answer6: ""
      };
    }
  };
}

let store = window.store = new QuizAssessmentStore();

export default store;
