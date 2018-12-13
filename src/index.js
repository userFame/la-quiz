import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import testStore from "./stores/test.store";
import quizAssessmentStore from "./stores/quiz.store";
import timerStore from "./stores/timer.store";
import { Provider } from "mobx-react";
import * as serviceWorker from "./serviceWorker";

const stores = { testStore, quizAssessmentStore, timerStore };

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
