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
choices : ["11","4231","yes"],
answer : 2
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
    _quizzy.init = function(){
        _questions = questions.slice();
        console.log(_questions);
        shuffleArray(_questions);
        console.log(_questions);
    }

    
    return _quizzy;
}());














$(document).ready(quizzy.init);