export default [
  {
    id: 1,
    value:
      'This is what it would like for a question that accepts text answers. As you can see there are multple textboxes. Depending on the "num_of_examples" coming from the apiQuestions.js, you can change the number of textboxes that show up.',
    type: "text",
    allow_multiple: 0,
    _order: 1,
    instructions: "",
    num_of_examples: 2,
    choices: []
  },
  {
    id: 2,
    value:
      "This is an example of a multiple choice question that takes an answer as soon as you click on it. If you click on go back you can see that it saves the answer that you have previously inputed in the textboxes.",
    type: "choice",
    allow_multiple: 0,
    _order: 2,
    instructions: "",
    num_of_examples: 0,
    choices: [
      {
        choice_id: 35,
        question_id: 10,
        value: "You can choose this",
      },
      {
        choice_id: 36,
        question_id: 10,
        value: "Or this",
      },
      {
        choice_id: 37,
        question_id: 10,
        value: "Maybe even this one if you like.",
      },
      {
        choice_id: 34,
        question_id: 10,
        value: "Click me if you want to live.",
      }
    ]
  },
  {
    id: 4,
    value:
      "Here's another textbox answer with more textboxes (allowed up to 6 with this code) just in case you wanted to play with the go back button after playing with the following example.",
    type: "text",
    allow_multiple: 0,
    _order: 1,
    instructions: "",
    num_of_examples: 6,
    choices: []
  },
  {
    id: 3,
    value:
      "This allows a person to select answers that apply to a question.",
    type: "choice",
    allow_multiple: 1,
    _order: 4,
    instructions: "SELECT ALL THAT APPLY",
    num_of_examples: 0,
    choices: [
      {
        choice_id: 15,
        question_id: 6,
        value: "You can choose me.",
      },
      {
        choice_id: 16,
        question_id: 6,
        value:
          "While also choosing me.",
      },
      {
        choice_id: 17,
        question_id: 6,
        value: "As well as choosing me",
      },
      {
        choice_id: 33,
        question_id: 6,
        value: "You don't have to choose me.",
      },
      {
        choice_id: 18,
        question_id: 6,
        value:
          "You must choose me if you want to live.",
      }
    ]
  },
];
