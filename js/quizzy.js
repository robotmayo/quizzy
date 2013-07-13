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
// Constants
    var _hours = 1000 * 60 * 60;
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
    this.milliseconds += elapsed;

    this.seconds += Math.floor(this.milliseconds / _seconds);
    this.minutes += Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.clock / _hours);
    if(this.seconds > 60) this.seconds = 0;
    if(this.minutes > 60) this.
    this.last = Date.now();
};
Timer.prototype.getTime = function() {
    return {
        hours:this.hours,
        minutes:this.minutes,
        seconds:this.seconds,
        milliseconds:this.clock
    };
};
Timer.prototype.printTime = function() {
    var time = this.getTime();
    var hr;
    var min;
    var sec;
    hr = time.hours;
    min = time.minutes < 10 ? "0"+time.minutes : time.minutes;
    sec = time.seconds < 10 ? "0"+time.seconds : time.seconds;
    console.log(hr+":"+min+":"+sec);

};

var quizzy = (function(){

    var LinkedList = function(){
        var _ll = {};
        var _first;
        var _last;
        var _size = 0;
        _ll.push = function(val){
            var node = new Node(val);
            if(_size === 0){
                _first = _last = node;
            }else{
                _last.next = node;
                node.prev = _last;
                _last = node;
            }
            _size++;
            return node;
        };

        _ll.pop = function(){
            var val = _last;
            _last = _last.prev;
            _size--;
            return val;
        };
        _ll.shift = function(){
            var val = _first;
            _first = _first.next;
            _size--;
            return val;
        }

        _ll.remove = function(index){
            var current = _first
            var val;
            if(index === 0){
                _size--;
                return this.shift();
            }
            if(index === _size){
                return this.pop();
            }
            while(index--){
                current = current.next;
            }
            val = current;
            // Links the broken nodes together
            current.prev.next = current.next;
            current.next.prev = current.prev;
            return val;
        };

        _ll.get = function(index){
            var current;
            if(index === 0) return _first;
            if(index === size-1) return _last;
            current = first;
            while(index--){
                current = current.next;
            }
            return current;
        }
        _ll.size = function(){return _size;}

        _ll.getFirst = function(){
            return _first;
        }
        _ll.getLast = function(){
            return _last;
        }
        _ll.arrayToList = function(arr){
            for(var i = 0; i < arr.length; i++){
                _ll.push(arr[i]);
            }
        }
        var Node = function(val){
            this.value = val;
            var next = {};
            var prev = {};
        };
        return _ll;
}


    var _quizzy = {};

    // Data
    var _questions;
    var _tQuestions;
    var _answer; // Not the actual answer but rather the index of the answer.
    var _score;

    // Display
    var _quizContainer;
    var _frag;
    var _title;
    var _inputWrap;
    var _buttons;

    _quizzy.currentQuestion;
    _quizzy.questionCount;
    _quizzy.questions;
    _quizzy.init = function(){
        // Duplicates the questions into this internal array
        _questions = questions.slice();
        shuffleArray(_questions);
        _quizzy.questions = _questions;
        _tQuestions = new LinkedList();
        _tQuestions.arrayToList(_questions);
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
    
    _quizzy.getNextQuestion = function(){
        return _currentQuestion.next;
    }
    _quizzy.jumpToQuestion = function(n){

    }
    _quizzy.prevQuestion = function(){

    }
    _quizzy.nextQuestion = function(){
        _currentQuestion = getNextQuestion();
        if(!_currentQuestion) _quizzy.end();
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
    _quizzy.end = function(){
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