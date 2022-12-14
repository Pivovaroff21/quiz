const btnOpenModal = document.querySelector("#btnOpenModal");
const modalBlock = document.querySelector("#modalBlock");
const closeModal = document.querySelector("#closeModal");
const questionTitle = document.querySelector("#question");
const formAnswers = document.querySelector("#formAnswers");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const sendButton = document.querySelector("#send");
let questionData;







// async function getData() {
//   formAnswers.textContent = "LOAD";
//   const response = await fetch(
//     "/questions.json"
//   )
//     .then((res) => res.json())
//     .then((obj) => {
//       questionData = obj.questions;
//       formAnswers.textContent = "";
//       playTest();
//     })
//     .catch((err) => {
//       console.log(err);
//       formAnswers.textContent = "DATA ERROR 404";
//     });
// }

const getData = ()=>{

    setTimeout(()=>{
    const firebaseConfig = {
    apiKey: "AIzaSyA2snDA9OzU6r4DXO5Z2demYJkva24tDTs",
    authDomain: "burger1-6377b.firebaseapp.com",
    databaseURL: "https://burger1-6377b-default-rtdb.firebaseio.com",
    projectId: "burger1-6377b",
    storageBucket: "burger1-6377b.appspot.com",
    messagingSenderId: "55268271449",
    appId: "1:55268271449:web:5ddde00611c8c3a3de9848",
    measurementId: "G-WHX2T23J2Y"
  };

  
  firebase.initializeApp(firebaseConfig);
  firebase.database().ref().child("questions").once("value").then((snap) => {questionData = snap.val();formAnswers.textContent = "";playTest();}  )
    },1000);
    
}
// const questionData = [
//   {
//     question: "Какого цвета бургер?",
//     answers: [
//       {
//         title: "Стандарт",
//         url: "./image/burger.png",
//       },
//       {
//         title: "Черный",
//         url: "./image/burgerBlack.png",
//       },
//     ],
//     type: "radio",
//   },
//   {
//     question: "Из какого мяса котлета?",
//     answers: [
//       {
//         title: "Курица",
//         url: "./image/chickenMeat.png",
//       },
//       {
//         title: "Говядина",
//         url: "./image/beefMeat.png",
//       },
//       {
//         title: "Свинина",
//         url: "./image/porkMeat.png",
//       },
//     ],
//     type: "radio",
//   },
//   {
//     question: "Дополнительные ингредиенты?",
//     answers: [
//       {
//         title: "Помидор",
//         url: "./image/tomato.png",
//       },
//       {
//         title: "Огурец",
//         url: "./image/cucumber.png",
//       },
//       {
//         title: "Салат",
//         url: "./image/salad.png",
//       },
//       {
//         title: "Лук",
//         url: "./image/onion.png",
//       },
//     ],
//     type: "checkbox",
//   },
//   {
//     question: "Добавить соус?",
//     answers: [
//       {
//         title: "Чесночный",
//         url: "./image/sauce1.png",
//       },
//       {
//         title: "Томатный",
//         url: "./image/sauce2.png",
//       },
//       {
//         title: "Горчичный",
//         url: "./image/sauce3.png",
//       },
//     ],
//     type: "radio",
//   },
// ];

function renderQuestions(id) {
  switch (id) {
    case 0:
      prevButton.classList.add("d-none");
      questionTitle.textContent = questionData[id].question;
      renderAnswers(id);
      break;

    case questionData.length:
      questionTitle.textContent = "";
      formAnswers.innerHTML = `
      <div class = "form-group">
        <label for="numberPhone">Enter your number</label>
        <input type="phone" class="form-control" id="numberPhone">
      </div>
      `;
      nextButton.classList.add("d-none");
      prevButton.classList.add("d-none");
      sendButton.classList.add("d-block");
      break;

    case questionData.length + 1:
      sendButton.classList.remove("d-block");
      prevButton.classList.add("d-none");
      formAnswers.textContent = "Спасибо за ваши ответы";
      setTimeout(() => {
        modalBlock.classList.remove("d-block");
        formAnswers.innerHTML = "";
      }, 2000);
      break;

    default:
      prevButton.classList.remove("d-none");
      nextButton.classList.remove("d-none");
      sendButton.classList.add("d-none");
      questionTitle.textContent = questionData[id].question;
      renderAnswers(id);
      break;
  }
}

function renderAnswers(id) {
  questionData[id].answers.forEach((answer) => {
    const question = `
                <div class="answers-item d-flex justify-content-center">
                    <input type="${questionData[id].type}" id="${answer.title}" name="answer" class="d-none" value = "${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                </div>  
            `;
    formAnswers.insertAdjacentHTML("beforeend", question);
  });
}

function checkAnswers(questionId, obj) {
  const inputs = [...formAnswers.elements].filter(
    (input) => input.checked || input.id === "numberPhone"
  );
  console.log(inputs);
  inputs.forEach((input, index) => {
    if (questionId >= 0 && questionId < questionData.length) {
      obj[`${index}_${questionData[questionId].question}`] = input.value;
    }
    if (questionId === questionData.length) {
      obj["Номер телефона"] = input.value;
    }
  });
}
function playTest() {
  let questionId = 0;
  const resultObj = {};
  prevButton.classList.remove("d-none");
  nextButton.classList.remove("d-none");
  sendButton.classList.add("d-none");
  prevButton.addEventListener("click", () => {
    questionId--;
    formAnswers.innerHTML = "";
    formAnswers.textContent = "";
    renderQuestions(questionId);
  });
  nextButton.addEventListener("click", () => {
    checkAnswers(questionId, resultObj);
    questionId++;
    formAnswers.innerHTML = "";
    renderQuestions(questionId);
  });
  sendButton.addEventListener("click", () => {
    checkAnswers(questionId, resultObj);
    questionId++;
    renderQuestions(questionId);
    firebase
    .database()
    .ref()
    .child('contacts')
    .push(resultObj)
  });
  renderQuestions(questionId);
}

btnOpenModal.addEventListener("click", () => {
  modalBlock.classList.add("d-block");
  getData();
});

closeModal.addEventListener("click", () => {
  modalBlock.classList.remove("d-block");
  formAnswers.innerHTML = "";
});
