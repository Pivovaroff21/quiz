const btnOpenModal = document.querySelector("#btnOpenModal");
const modalBlock = document.querySelector("#modalBlock");
const closeModal = document.querySelector("#closeModal");
const questionTitle = document.querySelector("#question");
const formAnswers = document.querySelector("#formAnswers");

btnOpenModal.addEventListener("click", () => {
  modalBlock.classList.add("d-block");
  playTest();
});

closeModal.addEventListener("click", () => {
  modalBlock.classList.remove("d-block");
  formAnswers.innerHTML = "";
});

function playTest() {
  const renderQuestions = () => {

    questionTitle.textContent = "Какого цвета бургер вы хотите";
    let questionData = {
        name:["Стандарт","Черный"],
        img:["./image/burger.png","./image/burgerBlack.png"]
    };

   for(let i = 0;i<questionData.name.length;i++){
        const question = `
        <div class="answers-item d-flex flex-column">
            <input type="radio" id="answerItem${i}" name="answer" class="d-none">
            <label for="answerItem${i}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${questionData.img[i]}" alt="burger">
            <span>${questionData.name[i]}</span>
            </label>
        </div>  
    `;
    formAnswers.insertAdjacentHTML('beforeend',question);
   };
    
  };
  renderQuestions();
}
