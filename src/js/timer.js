// Constants
    var _hours = 1000 * 60 * 60;
    var _minutes = 1000 * 60;
    var _seconds = 1000;

QuizzyTimer = function(tick,handler,start){
    this.handler = handler || null;
    this.tick = tick || 20;
    this.elapsed = 0;
    this.last = 0;
    this.clock = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;

    if(start){
        this.start();
    }
}
QuizzyTimer.prototype.start = function() {
    this.last = Date.now();
    var self = this;
    this.intervalId = setInterval(function(){
        self.update();
    },this.tick);
};
QuizzyTimer.prototype.stop = function() {
    clearInterval(this.intervalId);
};
QuizzyTimer.prototype.update = function(){
    this.elapsed = Date.now() - this.last;
    this.clock += this.elapsed;
    this.milliseconds += this.elapsed;

    this.seconds += Math.floor(this.milliseconds / _seconds);
    this.minutes += Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.clock / _hours);

    // This will keep any rolled over values caused by inconsistent timing
    if(this.minutes >= 60) this.minutes = this.minutes - 60;
    if(this.seconds >= 60) this.seconds = this.seconds - 60;
    if(this.milliseconds >= 1000) this.milliseconds = this.milliseconds - 1000;
    this.last = Date.now();
};
QuizzyTimer.prototype.getTime = function() {
    return {
        hours:this.hours,
        minutes:this.minutes,
        seconds:this.seconds,
        milliseconds:this.clock
    };
};
QuizzyTimer.prototype.getTotalTime = function() {
    return{
        hours : this.clock / _hours,
        minutes : this.clock / _minutes,
        seconds : this.clock / _seconds,
        milliseconds : this.clock
    }
};
QuizzyTimer.prototype.printTime = function() {
    var time = this.getTime();
    var hr;
    var min;
    var sec;
    hr = time.hours;
    min = time.minutes < 10 ? "0"+time.minutes : time.minutes;
    sec = time.seconds < 10 ? "0"+time.seconds : time.seconds;
    console.log(hr+":"+min+":"+sec);
};