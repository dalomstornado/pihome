const moment = require('moment');
const Stopwatch = require('timer-stopwatch'); 

const reduceHours = 
    [{ start: 0, hour: 1, stop: 2 },
    { start: 2, hour: 3, stop: 4 },
    { start: 4, hour: 5, stop: 6 },
    { start: 6, hour: 7, stop: 8 },
    { start: 8, hour: 9, stop: 10 },
    { start: 10, hour: 11, stop: 12 },
    { start: 12, hour: 13, stop: 14 },
    { start: 14, hour: 15, stop: 16 },
    { start: 16, hour: 17, stop: 18 },
    { start: 18, hour: 19, stop: 20 },
    { start: 20, hour: 21, stop: 22 },
    { start: 22, hour: 23, stop: 24 }];

const reduceInMinutes = () => {
    return (reduceHours[0].stop - reduceHours[0].start) * 60;
};

const getReducedMoment = (date) => {
    const m = moment.utc(date); //toDate() blir samma i alla fall.

    for (let i = 0; i < reduceHours.length; i++) {        
        if (m.hours() >= reduceHours[i].start && m.hours() < reduceHours[i].stop) {
            m.hours(reduceHours[i].hour);
            m.minutes(0);
            m.seconds(0);
            m.milliseconds(0);

            return m;
        }
    } 
};

const createTimeArray = (from, to = getReducedMoment(new Date())) => {
    let ret = new Array();
    let currentMoment = getReducedMoment(from.toDate());
    while (currentMoment <= to)
    {
        ret.push([currentMoment.toDate()])
        currentMoment = currentMoment.add(reduceInMinutes(), 'm');
    }
    return ret;
};

const findTime = (m, timeArray) => {
    for (let i = 0; i < timeArray.length; i++) {
        let m2 = moment(timeArray[i][0]);
        if (m2.isSame(m)) {
            return timeArray[i];
        }
    }
    return undefined;
};

Array.prototype.add = function(dataSerie, index) {
    for(let i = 0; i < dataSerie.length; i++) {
        const thisMoment = getReducedMoment(dataSerie[i].date);
        const thisTime = findTime(thisMoment, this);
        if (thisTime) {
            if (thisTime[index]){
                thisTime[index] = (thisTime[index] + dataSerie[i].value) / 2;    
            } else {
                thisTime[index] = dataSerie[i].value;
            }
        }
    }
};

Array.prototype.clean = function() {
    for (let i = 0; i < this.length; i++) {
        if (this[i].length <= 1) {
            this.splice(i, 1);
            i--;
        }
    }
};

const maxLength = (array) => {
    let maxLength = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].length > maxLength) {
            maxLength = array[i].length;
        }
    }
    return maxLength;
};

Array.prototype.pad = function(maxLength) {
    for (let i = 0; i < this.length; i++) {
        for (let x = 1; x < maxLength; x++) {
            let value = this[i][x];
            if (value === undefined) {
                /*
                //Getting last value
                let lastValue = 0;
                for (let y = i-1; y >= 0; y--) {
                    lastValue = this[y][x];
                    if (lastValue !== undefined) {
                        break;
                    }
                }*/
                this[i][x] = undefined; //lastValue;
            }
        }        
    }
};

const lineChartData = (from, dataSeries) => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    
    const timeArray = createTimeArray(from);
    for(let i = 0; i < dataSeries.length; i++) {
        timeArray.add(dataSeries[i], i + 1);
    }
    timeArray.clean();
    timeArray.pad(maxLength(timeArray));

    stopwatch.stop();
    console.log(`Dathandler ${dataSeries.length} array(s), ${timeArray.length} times in ${stopwatch.ms} ms.`);
    return timeArray;
};

module.exports = { lineChartData}