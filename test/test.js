var ll = new LinkedList();
for(var i = 0; i < 100; i++){
    ll.push(i);
}

var d = quizzy.createInput('radio',[24,235,53262,6226,235626,23]);
console.log(d[0].value);
d = quizzy.createInput('radio',10);
console.log(d);
//quizzy.init();