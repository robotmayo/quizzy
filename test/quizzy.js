var quizzy = (function(){
    var _quizzy = {};

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
    _quizzy.init = function(){
        // Duplicates the questions into this internal array
        // Array.slice
        // Array.slice everywhere
        _questions = questions.slice();
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

    }
    _quizzy.createInput = function(type,count){
        type = type || 'radio';
        type = type.toLowerCase();
        count = count || 1;
        var inputs = [];
        for(var i = count; i > 0; i--){
            if(type=='radio'){
                inputs.push(_quizzy.createRadioButton('quizzy-radio'))
            }
        }
        return inputs;
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
                _quizzy.end();
            }
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