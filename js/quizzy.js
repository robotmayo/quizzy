var quizzyUtils = {};
quizzyUtils.getRandom = function(min,max){
    return min + Math.floor(Math.random() * (max - min + 1));
}
// Shuffle array in place
quizzyUtils.shuffleArray = function(array){
    var swap;
    var store;
    for(var i = array.length-1; i >= 0; i--){
        store = this.getRandom(0,i);
        swap = array[i];
        array[i] = array[store];
        array[store] = swap;
    }
}

var quizzyUtils = {};
quizzyUtils.getRandom = function(min,max){
    return min + Math.floor(Math.random() * (max - min + 1));
}
// Shuffle array in place
quizzyUtils.shuffleArray = function(array){
    var swap;
    var store;
    for(var i = array.length-1; i >= 0; i--){
        store = this.getRandom(0,i);
        swap = array[i];
        array[i] = array[store];
        array[store] = swap;
    }
}
var quizzy = (function(){
    var _quizzy = {};
    var quizzyConstants = {}; // I GUESS THEY ARE CALLED CONSTANTS BECAUSE THEY ARE CONSTANTLY YELLING
    quizzyConstants.STRING_RADIO = "radio";
    quizzyConstants.NUMBER_DEFAULT_SCORE_PER_QUESTION = 1;

    // Data
    var _questions;
    var _tQuestions;
    var _answer; // Not the actual answer but rather the index of the answer.
    var _score;
    var _currentQuestion; // Refers to the node of the question not the question data itself.

    // Display
    var _quizContainer;
    var _frag;
    var _title;
    var _inputWrap;
    var _buttons;

    _quizzy.currentQuestion;
    _quizzy.questionCount;
    _quizzy.questions;

    QuizzyQuestion = function(q){
        this.question = q.question;
        this.answer = q.answer || null;
        this.choices = q.choices;
        this.score = q.score || quizzyConstants.NUMBER_DEFAULT_SCORE_PER_QUESTION;
        this.type = q.type || quizzyConstants.STRING_RADIO;
        this.userChoice = null;
    }
    _quizzy.init = function(){
        // Duplicates the questions into this internal array
        // Array.slice
        // Array.slice everywhere
        var temp = questions.slice();
        _questions = [];
        for(var i = 0; i < temp.length;i++){
            _questions.push(new QuizzyQuestion(temp[i]));
        }
        temp = null;
        _quizzy.questions = _questions.slice();
        quizzyUtils.shuffleArray(_questions);
        _questions = new LinkedList();
        _questions.arrayToList(_quizzy.questions.slice());
        _quizContainer = document.getElementById("quizzy");
        if(_quizContainer == null){
            throw new Error("Couldn't find quizzy starting element. Aborting mission!");
        }
        _score = 0;
        _quizzy.questionCount = _questions.size();
        _quizzy.createQuizInterface();
        _quizzy.start();
    }
    _quizzy.start = function(){
        _currentQuestion = _questions.getFirst();
        _quizzy.updateQuizInterface();
    }
    _quizzy.updateQuizInterface = function(){
        var inputs;
        var i;
        _title.innerHTML = _currentQuestion.value.question;
        var frag = document.createDocumentFragment();
        var child = _inputWrap.firstChild;
        var removeNode;
        while(child){
            removeNode = null;
            if(child.tagName == 'LABEL' || child.tagName == 'INPUT'){
                removeNode = child;
            }
            child = child.nextSibling;
            if(removeNode) removeNode.parentNode.removeChild(removeNode);
        }
        inputs = _quizzy.createInput('radio',_currentQuestion.value.choices);
        for(i = 0; i < inputs.length; i++){
            frag.appendChild(_quizzy.wrapInLabel(inputs[i]));
        }
        _inputWrap.appendChild(frag);
        frag = inputs = null;
        
    }
    _quizzy.wrapInLabel = function(input,value){
        var label = document.createElement('label');
        label.appendChild(input);
        label.innerHTML += value || input.value;
        return label;
    }
    _quizzy.createInput = function(type,values){
        type = type || 'radio';
        type = type.toLowerCase();
        var inputs = [];
        if(!isNaN(values)){
            for(var i = 0; i < values; i++){
                if(type == 'radio'){
                    inputs.push(_quizzy.createRadioButton('quizzy-radio'));
                }
            }
        }else{
            values = values || _currentQuestion.value.choices;
            for(var i = 0; i < values.length; i++){
                if(type == 'radio'){
                    inputs.push(_quizzy.createRadioButton('quizzy-radio',values[i]));
                }
            }
        }
        
        return inputs;
    }
    _quizzy.createRadioButton = function(name,value,id){
        var radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = name;
        radioBtn.value = value || '';
        radioBtn.id = id || '';
        return radioBtn;
    }
    _quizzy.createQuizInterface = function(){
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
        _currentQuestion = _quizzy.getNextQuestion();
        if(!_currentQuestion) {
            _quizzy.end();
        }else{
            _quizzy.updateQuizInterface();
        }
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
            if(choice == _currentQuestion.value.answer) {
                _score += _currentQuestion.value.score;
            }
            _quizzy.nextQuestion();
        }else{
            alert("You didn't input anything!");
        }
    }
    _quizzy.calculateScore = function(){
        return _score;
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