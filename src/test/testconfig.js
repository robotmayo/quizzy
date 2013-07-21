var QuizzyTest = (function(){
    _test = {};
    _test.$getNextQuestionWhenNone = function (){
        if(quizzy.getNextQuestion() !== false) {
            throw new Error("Should be false")
        }else{
            console.log("Get next questions works as intended");
        }
    }

    _test.startQuizzy = function(config){
        quizzy.init(config);
    }
    return _test;
}());


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