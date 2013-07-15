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