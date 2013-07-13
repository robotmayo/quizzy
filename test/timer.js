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
    if(this.clock > 1000){
        this.seconds += Math.floor(this.clock / 1000);
        this.clock = 0;
    }
    if(this.seconds > 60){
        this.minutes += Math.floor(this.seconds / 60);
    }
    if(this.minutes > 60){
        this.hours += Math.floor(this.minutes / 60);
    }
    this.last = Date.now();
    this.printTime();
}
Timer.prototype.getTime = function() {
    return this.sTime;
};
Timer.prototype.printTime = function() {
    console.log(this.seconds);
};