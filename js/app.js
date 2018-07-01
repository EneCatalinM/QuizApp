
import question from "./question.js";
import Quiz from "./Quiz.js";


const App = (()=>{
    //cache the DOM
    const quizEl=document.querySelector(".jabquiz");
    const quizQuestionEl=document.querySelector(".jabquiz__question");
    const trackerEl = document.querySelector(".jabquiz__tracker");
    const taglineEl = document.querySelector(".jabquiz__tagline");
    const choicesEl = document.querySelector(".jabquiz__choices");
    const progressInnerEl= document.querySelector(".progress__inner");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");
console.log()

    const q1 = new question(
        "First President of US?",
    ["Barrack","Osama","George","Monkey"],
    2
)
const q2 = new question(
    "When was Javascript created?",
["June 1995","May 1995","July 1885","Sep 1996"],
1
)
const q3 = new question(
    "What does CSS stand for?",
["County Sheriff Service","Cascading Sexy Sheets","Cascading Style Sheets","Monkey"],
2
)
const q4 = new question(
    "The full form of HTML is...",
["Hyper Text Markup Language","Hold the Mic","ERROR","Monkey"],
0
)
const q5 = new question(
    "console.log(typeof[]) would return what?",
["Array","Object","null","array"],
1
)
const q6 = new question(
    "Inside which HTML element do we put the JavaScript? ",
["js","script","scripting","javascript"],
1
)
const q7 = new question(
    " Where is the correct place to insert a JavaScript?",
["Both the head","The body section","The head section","Monkey"],
0
)

const quiz = new Quiz([q1,q2,q3,q4,q5,q6,q7]);



const listeners = _ =>{
    nextButtonEl.addEventListener("click",function(){
        const selectedRadioElem=document.querySelector('input[name="choice"]:checked')
        if(selectedRadioElem){
           const key= Number(selectedRadioElem.getAttribute("data-order"));
           quiz.guess(key);
           renderAll();
        }else {
            alert("Pick a choice");
        }
    })
    restartButtonEl.addEventListener("click",function(){
       //1.reset the quiz
       quiz.reset();
       setValue(taglineEl,`Pick an option below`);
       //2.renderall again
       renderAll();
       //3.restore next button
       nextButtonEl.style.opacity=1;
    })
}

const setValue = (elem,value)=>{
    elem.innerHTML= value;
}
const renderQuestion = _ =>{
    const question=quiz.getCurrentQuestion().question;
    setValue(quizQuestionEl,question);
}
const renderChoicesELements = _ =>{
   let markup = "";
   const currentChoices = quiz.getCurrentQuestion().choices;
   currentChoices.forEach((elem,index)=>{
    markup+=`
    <li class="jabquiz__choice">
    <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}">
    <label for="choice${index}" class="jabquiz__label">
        <i></i>
        <span>${elem}</span>
    </label>
</li>`
   });
   setValue(choicesEl,markup);
}

const renderTracker = _ =>{
    const index = quiz.currentIndex;
    setValue(trackerEl,`${index+1} of ${quiz.questions.length}`)
}
const getPercentage = (num1,num2)=>{
    return Math.round((num1/num2)*100);
}
const launch=(width,maxPercent)=>{
    let loadingBar = setInterval(function(){
        if(width>maxPercent){
            clearInterval(loadingBar);
        }else{
            width++;
            progressInnerEl.style.width=`${width}%`;
        }
    },3)
}

const renderProgress = _ =>{
    //1.width
    const currentWidth= getPercentage(quiz.currentIndex,quiz.questions.length);
    //2.Launch(0,width)
    launch(0,currentWidth);
}
const renderEndScreen = _ =>{
    setValue(quizQuestionEl,`Great Job!`);
    setValue(taglineEl,`Complete`);
    setValue(trackerEl,`Your score: ${getPercentage(quiz.score,quiz.questions.length)}%`)
    nextButtonEl.style.opacity=0;
    const Percentage =getPercentage(quiz.score,quiz.questions.length);
    const render =
    `
    <h1 class="GG">Today you got ${getPercentage(quiz.score,quiz.questions.length)}% points, we congrats you!</h1>
    `
    const render2 =
    `
    <h1 class="GG2">Today you got ${getPercentage(quiz.score,quiz.questions.length)}% points, we congrats you! 
    Next time you will be better.</h1>
    `
    if(Percentage>50){
        setValue(choicesEl,render);
    }else{
        setValue(choicesEl,render2);
    }
    
    renderProgress();
} 

const renderAll = _ =>{
    if(quiz.hasEndend()){
        //renderEndScreen
        renderEndScreen();
    }else {
        //1.render the question
        renderQuestion();
        //2.Render the choices elements
        renderChoicesELements();
        //3. Render the tracker
        renderTracker();
        //4. Render the progress
        renderProgress();
    }
}
return {
    renderAll:renderAll,
    listeners:listeners
}
})();
App.renderAll();
App.listeners();