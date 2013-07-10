var questions = [
{question: "What is 150 * 0?",
choices : ["0","-150","150","42"],
answer : 0
},
{question: "Is sexy back?",
choices : ["yes","no","Only on Tuesdays"],
answer : 2
},
{question: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
choices : ["11","4231","yes","BUTTERED TOAST"],
answer : 3
}
];
function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
// Shuffles the array in place
function shuffleArray(array){
    var swap;
    var store;
    for(var i = array.length-1; i >= 0; i--){
        store = getRandom(0,i);
        swap = array[i];
        array[i] = array[store];
        array[store] = swap;
    }
}
var quizzy = (function(){
    var _quizzy = {};
    var _questions;
    var _quizContainer;
    var _answerElements;
    var _frag;
    var _title;
    var _inputWrap;
    var _buttons;

    _quizzy.currentQuestion;
    _quizzy.questionCount = -1;
    _quizzy.totalQuestions;
    _quizzy.init = function(){
        // Duplicates the questions into this internal array
        _questions = questions.slice();
        shuffleArray(_questions);
        _quizContainer = document.getElementById("quizzy");
        if(_quizContainer == null){
            throw new Error("Couldn't find quizzy starting element. Aborting mission!");
        }
        _quizzy.setupElements();
        _quizzy.nextQuestion();
    }
    _quizzy.setupElements = function(){
        _frag = document.createDocumentFragment();
        _title = document.createElement('h2');
        _title.id = "quizzy-title";

        _inputWrap = document.createElement('div');
        _inputWrap.id = "quizzy-input-wrap";

        _buttons = {};
        _buttons.next = document.createElement("button");
        _buttons.next.id = "quizzy-next";
        _buttons.next.innerHTML = "NEXT";
        addEvent('click',_buttons.next,_quizzy.nextQuestion);

        _frag.appendChild(_title);
        _frag.appendChild(_inputWrap);
        _frag.appendChild(_buttons.next);
        _quizContainer.appendChild(_frag);
        
        while(_frag.lastChild){_frag.removeChild(_frag.lastChild)}
    }
    _quizzy.nextQuestion = function(){
        _quizzy.questionCount++;
        var radio;
        var label;
        _title.innerHTML = _questions[_quizzy.questionCount].question;
        for(var i = 0; i <= _questions[_quizzy.questionCount].choices.length-1; i++){
            label = document.createElement("label");
            radio = document.createElement("input");
            radio.type = 'radio';
            radio.name = 'quizzy-radio';
            radio.value = _questions[_quizzy.questionCount].choices[i];
            label.appendChild(radio);
            label.innerHTML += " "+_questions[_quizzy.questionCount].choices[i];
            _frag.appendChild(label);
        }
        _inputWrap.appendChild(_frag);
    }

    function addEvent(evt,obj,handler){
        if(obj.addEventListener){
            obj.addEventListener(evt,handler,false);
        }else if(obj.attachEvent){
            obj.attachEvent("on"+evt,handler);
        }else{
            throw new Error("The supplied object does not support either event methods.");
        }
    }

    
    return _quizzy;
}());














$(document).ready(quizzy.init);