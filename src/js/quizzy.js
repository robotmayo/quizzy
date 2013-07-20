
var quizzy = (function(){
    var _quizzy = {};
    var _quizzyConstants = {}; // I GUESS THEY ARE CALLED CONSTANTS BECAUSE THEY ARE CONSTANTLY YELLING
    _quizzyConstants.STRING_RADIO = "radio";
    _quizzyConstants.NUMBER_DEFAULT_SCORE_PER_QUESTION = 1;

    // Data
    var _questions;
    var _score;
    var _defaultConfig = {
        allowBackTrack : false,
        showHistory : false,
        backDistance : 0,
        shuffle : false,
        questions : null,
        startPoint : null,
    }

    _quizzy.currentQuestion;
    _quizzy.questions;
    _quizzy.config;
    _quizzy.quizElements;

    QuizzyQuestion = function(q){
        this.question = q.question;
        this.answer = q.answer; 
        this.choices = q.choices;
        for(var i = 0;i<this.choices.length;i++){this.choices[i] = this.choices[i]+""}
        this.score = q.score || _quizzyConstants.NUMBER_DEFAULT_SCORE_PER_QUESTION;
        this.type = q.type || _quizzyConstants.STRING_RADIO;
        this.userChoice = null;
    }
    /*
    * The starting point for quizzy.
    * @param config : A plain JavaScript object containing the configurations to use.
    * @return none
    */
    _quizzy.init = function(config){
        if(config) {
            mergeConfigs(config);
        }else{_quizzy.config = _defaultConfig;}
        _quizzy.setUpQuestions(_quizzy.config.questions);

        _score = 0;
        _quizzy.questionCount = _questions.size();
        _quizzy.createQuizInterface();
        _quizzy.start();
    }
    /*
    * Sets up the questions into a format for internal use. Will use the param for the questions if supplied,
    * otherwise looks for QuizzyQuestions array
    * @param q : An array of objects representing the questions.
    * @return none
    */
    _quizzy.setUpQuestions = function(q){
        var temp;
        if(q) {
            temp = q.slice();
        }else{
            temp = QuizzyQuestions.slice();
        }
        _quizzy.questions = [];
        for(var i = 0; i < temp.length;i++){
            _quizzy.questions.push(new QuizzyQuestion(temp[i]));
        }
        temp = null;
        _questions = _quizzy.questions.slice();
        quizzyUtils.shuffleArray(_questions);
        _questions = new QuizzyList(_questions);
    }
    /*
    * Fetches the first question and updates the interface. A starting point for the quiz. 
    * NOT A STARTING POINT FOR QUIZZY ITSELF!
    * @return none
    */
    _quizzy.start = function(){
        _quizzy.currentQuestion = _questions.getFirst();
        _quizzy.updateQuizInterface();
    }
    /*
    * Updates the quiz interface with information from the current question. Currently a bit inneficient and rigid.
    * @return none
    */
    _quizzy.updateQuizInterface = function(){
        var inputs;
        var i;
        _quizzy.quizElements.quizHeader.innerHTML = _quizzy.currentQuestion.value.question;
        var frag = document.createDocumentFragment();
        var child = _quizzy.quizElements.inputWrap.firstChild;
        var removeNode;
        while(child){
            removeNode = null;
            if(child.tagName == 'LABEL' || child.tagName == 'INPUT'){
                removeNode = child;
            }
            child = child.nextSibling;
            if(removeNode) removeNode.parentNode.removeChild(removeNode);
        }
        inputs = _quizzy.createInput('radio',_quizzy.currentQuestion.value.choices);
        for(i = 0; i < inputs.length; i++){
            frag.appendChild(_quizzy.wrapInLabel(inputs[i]));
        }
        _quizzy.quizElements.inputWrap.appendChild(frag);
        frag = inputs = null;
        
    }
    

    /*
    * Creates the main quiz interface
    * @return none
    */
    _quizzy.createQuizInterface = function(){
        _quizzy.quizElements = {
            fragment : document.createDocumentFragment(),
            quizHeader : document.createElement('h2'),
            inputWrap : document.createElement('div'),
            buttons : {},
            container : null
        }

        _quizzy.quizElements.quizHeader.id = "quizzy-title";
        _quizzy.quizElements.inputWrap.id = "quizzy-input-wrap";
        _quizzy.quizElements.buttons.next = _quizzy.createButton("NEXT","quizzy-next");
        _quizzy.quizElements.buttons.prev = _quizzy.createButton("BACK","quizzy-prev");
        addEvent('click',_quizzy.quizElements.buttons.next,_quizzy.checkAnswer);
        addEvent('click',_quizzy.quizElements.buttons.prev,_quizzy.prevQuestion);

        _quizzy.quizElements.fragment.appendChild(_quizzy.quizElements.quizHeader);
        _quizzy.quizElements.fragment.appendChild(_quizzy.quizElements.inputWrap);
        _quizzy.quizElements.fragment.appendChild(_quizzy.quizElements.buttons.next);
        if(_quizzy.config.startPoint && document.getElementById(_quizzy.config.startPoint)){
            _quizzy.quizElements.container = document.createElement('div');
            _quizzy.quizElements.id = 'quizzy';
            _quizzy.quizElements.container.appendChild(_quizzy.quizElements.fragment);
            document.getElementById(_quizzy.config.startPoint).appendChild(_quizzy.quizElements.container);
        }else{
            _quizzy.quizElements.container = document.getElementById('quizzy');
            _quizzy.quizElements.container.appendChild(_quizzy.quizElements.fragment);
        }
    }
    /*
    * Creates a button
    * @param [text] The text to appear on the button
    * @param [id] The buttons id
    * @param [classname] Button classes [expects String || Number || Array]
    * @return element The button element created
    */
    _quizzy.createButton = function(text,id,classes){
        var btn = document.createElement("button");
        btn.id = id || "";
        btn.innerHTML = text || "";
        if(classes instanceof  Array){
            var d = " ";
            for(var i = 0; i < classes.length; i++){
                d += classes[i]+" ";
            }
            classes = d;
        }
        btn.className = classes || "";
        return btn;
    }
    
    /*
    * Returns the node of the next question
    * @return node
    */
    _quizzy.getNextQuestion = function(){
        return _quizzy.currentQuestion.next;
    }
    /*
    * Jumps to the given question. Nothing happens if the question isn't found.
    * @param index The question to jump to
    */
    _quizzy.jumpToQuestion = function(index){

    }
    /*
    * Returns the node of the previous question
    * @return node
    */
    _quizzy.prevQuestion = function(){

    }
    /*
    * Sets the current question to the next question and updates the interface. If there is none the end method is called.
    * @return none
    */
    _quizzy.nextQuestion = function(){
        _quizzy.currentQuestion = _quizzy.getNextQuestion();
        if(!_quizzy.currentQuestion) {
            _quizzy.end();
        }else{
            _quizzy.updateQuizInterface();
        }
    }
    /*
    * Sets the current question to the previous one and updates the interface. 
    * If there is none or going back is dissallowed the method does nothing.
    * @return none
    */
    _quizzy.prevQuestion = function(){
        _quizzy.currentQuestion = _quizzy.currentQuestion.prev;
        _quizzy.updateQuizInterface();
    }
    /*
    * Checks the answer.
    * True if answer is correct
    * False if answer is correct or there is no selection
    * @return boolean 
    */
    _quizzy.checkAnswer = function(){
        var choice;
        var answerIndex = _quizzy.currentQuestion.value.answer;
        var inputs = _quizzy.quizElements.inputWrap.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            if(inputs[i].checked){
                choice = inputs[i].value;
            }
        }
        if(choice){
            if(choice == _quizzy.currentQuestion.value.choices[answerIndex]) {
                _score += _quizzy.currentQuestion.value.score;
            }
            _quizzy.nextQuestion();
        }else{
            alert("You didn't input anything!");
        }
    }
    /*
    * Calculates and returns the score
    * @return number
    */
    _quizzy.calculateScore = function(){
        return _score;
    }
    /*
    * Returns the raw score.
    */
    _quizzy.getRawScore = function(){
        return _score;
    }
    /*
    * Ends the quiz, displaying a message and score if allowed.
    */
    _quizzy.end = function(){
        _quizzy.quizElements.quizHeader.parentNode.removeChild(_quizzy.quizElements.quizHeader);
        var child = _quizzy.quizElements.inputWrap.firstChild;
        while(child){
            removeNode = child;
            child = child.nextSibling;
            if(removeNode){removeNode.parentNode.removeChild(removeNode);}
        }
        var congratsMsg = document.createElement('h2');
        congratsMsg.innerHTML = "Your final score is: "+ _quizzy.calculateScore();
        _quizzy.quizElements.container.insertBefore(congratsMsg,_quizzy.quizElements.container.firstChild);
    }
    /*
    * Wraps the given input in a label.
    * @return element
    */
    _quizzy.wrapInLabel = function(input,value){
        var label = document.createElement('label');
        label.appendChild(input);
        label.innerHTML += value || input.value;
        return label;
    }
    /*
    * Creates an input of the given type.
    * @param type The type of input. [expects String]
    * @param [values] The number of inputs to create or an array of data to map to the value of inputs
    * If no value or type is supplied it will return one radio button. [expects Number || Array]
    * @return Array Array of the inputs
    */
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
        }else if(values){
            for(var i = 0; i < values.length; i++){
                if(type == 'radio'){
                    inputs.push(_quizzy.createRadioButton('quizzy-radio',values[i]));
                }
            }
        }else{inputs.push(_quizzy.createRadioButton('quizzy-radio'))}
        
        return inputs;
    }
    /*
    * Creates a radio button
    * @param [name] Name of the button [expects String || Number]
    * @param [value] Value of the button [expects String || Number]
    * @param [id] Id of the button [expects String || Number]
    * @param [classes] Button classes [expects String || Number || Array]
    * @return element Radio button element
    */
    _quizzy.createRadioButton = function(name,value,id,classes){
        var radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = name || '';
        radioBtn.value = value || '';
        radioBtn.id = id || '';
        if(classes instanceof  Array){
            var d = " ";
            for(var i = 0; i < classes.length; i++){
                d += classes[i]+" ";
            }
            classes = d;
        }
        radioBtn.className = d;
        return radioBtn;
    }
    /*
    * Wrapper function for adding events
    * evt The event to listen for [expects String]
    * obj The object to add the event to [expects Object]
    * handler The event handler [expects Function]
    * @return none
    */
    function addEvent(evt,obj,handler){
        if(obj.addEventListener){
            obj.addEventListener(evt,handler,false);
        }else if(obj.attachEvent){
            obj.attachEvent("on"+evt,handler);
        }else{
            throw new Error("The supplied object does not support either event methods.");
        }
    }
    /*
    * Merge the user and default configurations
    */
    function mergeConfigs(config){
        var holderObj = {};
        for(var name in _defaultConfig) {holderObj[name] = _defaultConfig[name];}
        for(var name in config){holderObj[name] = config[name];}
        _quizzy.config = holderObj;
    }

    
    return _quizzy;
}());
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