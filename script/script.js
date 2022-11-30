const btnOpenModal = document.querySelector("#btnOpenModal");
const modalBlock = document.querySelector("#modalBlock");
const closeModal = document.querySelector("#closeModal");
const questionTitle = document.querySelector("#question");
const formAnswers = document.querySelector("#formAnswers");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const questionData = [
    {
        question: "Какого цвета бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Черный',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Из какого мяса котлета?",
        answers: [
            {
                title: 'Курица',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Говядина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Дополнительные ингредиенты?",
        answers: [
            {
                title: 'Помидор',
                url: './image/tomato.png'
            },
            {
                title: 'Огурец',
                url: './image/cucumber.png'
            },
            {
                title: 'Салат',
                url: './image/salad.png'
            },
            {
                title: 'Лук',
                url: './image/onion.png'
            }
        ],
        type: 'checkbox'
    },
    {
        question: "Добавить соус?",
        answers: [
            {
                title: 'Чесночный',
                url: './image/sauce1.png'
            },
            {
                title: 'Томатный',
                url: './image/sauce2.png'
            },
            {
                title: 'Горчичный',
                url: './image/sauce3.png'
            }
        ],
        type: 'radio'
    }
];

  



function renderQuestions(id){
        if(id===0){
            prevButton.classList.add("d-none");
        }else if(id===questionData.length-1){
            nextButton.classList.add("d-none");
        }else{
            prevButton.classList.remove("d-none");
            nextButton.classList.remove("d-none");
        }
        questionTitle.textContent = questionData[id].question;  
        renderAnswers(id);
};

function renderAnswers(id) {
  questionData[id].answers.forEach((answer) => {
    const question = `
                <div class="answers-item d-flex flex-column">
                    <input type="${questionData[id].type}" id="${answer.title}" name="answer" class="d-none">
                    <label for="answerItem${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                </div>  
            `;
    formAnswers.insertAdjacentHTML("beforeend", question);
  });
};

function playTest() {
    let questionId = 0;
    prevButton.classList.remove("d-none");
    nextButton.classList.remove("d-none");
    prevButton.addEventListener("click",()=>{
        questionId--;
        formAnswers.innerHTML = "";
        renderQuestions(questionId);
    });
    nextButton.addEventListener("click", () => {
        questionId++;
        formAnswers.innerHTML = "";
        renderQuestions(questionId);
    });
    renderQuestions(questionId);
}


btnOpenModal.addEventListener("click", () => {
  modalBlock.classList.add("d-block");
  playTest();
});

closeModal.addEventListener("click", () => {
  modalBlock.classList.remove("d-block");
  formAnswers.innerHTML = "";
});