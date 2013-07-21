var QuizzyTest = (function(){
    _test = {};
    _test.$getNextQuestionWhenNone = function (){
        assert(quizzy.getNextQuestion() === false, "Should be false as there is no next question")
    }

    _test.$getUserSelectionNoSelection = function(){
        var inputs = quizzy.quizElements.inputWrap.getElementsByTagName('input');
        var choice = null;
        for(var i = 0; i < inputs.length; i++){
            if(inputs[i].checked) inputs[i].checked = !inputs[i].checked;
        }
        choice = quizzy.getUserSelection();
        assert(choice === null, 'Should be null as I unchecked everything');
    }

    _test.$getUserSelectionWithSelection = function(){
        var inputs = quizzy.quizElements.inputWrap.getElementsByTagName('input');
        var choice = null;
        inputs[0].checked = true;
        choice = quizzy.getUserSelection();
        assert(choice !== null, 'Should not be null as I checked something');
    }

    _test.startQuizzy = function(config){
        quizzy.init(config);
    }
    return _test;
}());

var output = document.getElementById('output');  
  
function assert( outcome, description ) {  
    var li = document.createElement('li');  
    li.className = outcome ? 'pass' : 'fail';  
    li.appendChild( document.createTextNode( description ) );  
      
    output.appendChild(li);  
};

var testConfigOne ={
    questions :[
        {   question: "How many masks can you obtain in Legend of Zelda : Majora's Mask",
            choices : [12,17,24,29],
            answer : 2
        },
        {   question: "How much time do you have to save the world in Legend of Zelda : Majora's Mask",
            choices : ["13 Days","2 Weeks","1 Month","3 Days"],
            answer : 3
        },
        {   question: "What does the Bunny Hood do?",
            choices : ["Grants you a movement boost","Allows you to talk to small rodents","Turns you into a bunny"],
            answer : 0
        },
        {   question: "What system did Majora's Mask release on?",
            choices : ["Nintendo 64","Nintendo Gamecube","Dreamcast"],
            answer : 0
        },
        {   question: "How many giants are needed to stop the moon?",
            choices : ["Four","Three","Six","Two"],
            answer : 0
        }
    ]
}
var testConfigTwo ={
    questions :[
        {   question: "How many masks can you obtain in Legend of Zelda : Majora's Mask",
            choices : [12,17,24,29],
            answer : 2
        }
    ]
}