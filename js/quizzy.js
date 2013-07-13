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
    var _answer; // Not the actual answer but rather the index of the answer.
    var _score;
    var _quizContainer;
    var _frag;
    var _title;
    var _inputWrap;
    var _buttons;

    // Constants
    var _hour = 1000 * 60 * 60;
    var _minutes = 1000 * 60;
    var _seconds = 1000;

    Timer = function(tick,handler,start){
        this.handler = handler || null;
        this.tick = tick || 20;
        this.elapsed = 0;
        this.last = 0;
        this.clock = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        console.log(this.tick);

        if(start){
            this.start();
        }
    }
    Timer.prototype.start = function() {
        console.log(this.tick);
        this.last = Date.now();
        var self = this;
        this.intervalId = setInterval(function(){
            self.update();
        },this.tick);
    };
    Timer.prototype.stop = function() {
        clearInterval(this.intervalId);
    };
    Timer.prototype.update = function(){
        this.elapsed = Date.now() - this.last;
        this.clock += this.elapsed;
        if(this.clock > _seconds){
            this.seconds += Math.floor(this.clock / _seconds);
            this.clock = 0;
        }
        if(this.seconds > 60){
            this.minutes += Math.floor(this.seconds / 60);
        }
        if(this.minutes > 60){
            this.hours += Math.floor(this.minutes / 60);
        }
        this.last = Date.now();
        this.printTime();
    }
    Timer.prototype.getTime = function() {
        return this.sTime;
    };
    Timer.prototype.printTime = function() {
        console.log(this.seconds);
    };

    _quizzy.currentQuestion;
    _quizzy.questionCount;
    _quizzy.totalQuestions;
    _quizzy.init = function(){
        // Duplicates the questions into this internal array
        _questions = questions.slice();
        shuffleArray(_questions);
        _quizContainer = document.getElementById("quizzy");
        if(_quizContainer == null){
            throw new Error("Couldn't find quizzy starting element. Aborting mission!");
        }
        _score = 0;
        _quizzy.questionCount = 0;
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
        addEvent('click',_buttons.next,_quizzy.checkAnswer);

        _frag.appendChild(_title);
        _frag.appendChild(_inputWrap);
        _frag.appendChild(_buttons.next);
        _quizContainer.appendChild(_frag);
        
        while(_frag.lastChild){_frag.removeChild(_frag.lastChild)}
    }
    _quizzy.nextQuestion = function(){
        var radio;
        var label;
        _title.innerHTML = _questions[_quizzy.questionCount].question;
        _answer = _questions[_quizzy.questionCount].answer;
        // Code from SO
        var child = _inputWrap.firstChild;
        var removeNode;
        while(child){
            removeNode = null;
            if(child.tagName == "LABEL"){
                removeNode = child;
            }
            child = child.nextSibling;
            if(removeNode){removeNode.parentNode.removeChild(removeNode);}
        }
        
        for(var i = 0; i < _questions[_quizzy.questionCount].choices.length; i++){
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
        while(_frag.lastChild){_frag.removeChild(_frag.lastChild)}
    }
    
    _quizzy.checkAnswer = function(){
        var choice;
        var inputs = _inputWrap.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            if(inputs[i].checked){
                choice = inputs[i].value;
            }
        }
        if(choice){
            if(choice == _questions[_quizzy.questionCount].choices[_answer]) {
                _score++;
            }
            if(_questions[++_quizzy.questionCount]){
                _quizzy.nextQuestion();
            }else{
                _quizzy.complete();
            }
        }else{
            alert("You didn't input anything!");
        }
    }
    _quizzy.calculateScore = function(){
        return _score + getRandom(1,99); // trololol
    }
    _quizzy.getRawScore = function(){
        return _score;
    }
    _quizzy.complete = function(){
        _title.remove();
        var child = _inputWrap.firstChild;
        while(child){
            removeNode = child;
            child = child.nextSibling;
            if(removeNode){removeNode.parentNode.removeChild(removeNode);}
        }
        var congratsMsg = document.createElement('h2');
        congratsMsg.innerHTML = "Your final score is: "+ _quizzy.calculateScore();
        _quizContainer.insertBefore(congratsMsg,_quizContainer.firstChild);
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
window.onload = function(){quizzy.init()}