const moment = require('moment');

const reduceHours = 
    [{ start: 0, hour: 2, stop: 4 },
    { start: 4, hour: 6, stop: 8 },
    { start: 8, hour: 10, stop: 12 },
    { start: 12, hour: 14, stop: 16 },
    { start: 16, hour: 18, stop: 20 },
    { start: 20, hour: 22, stop: 24 }];

const reduceInMinutes = () => {
    return (reduceHours[0].stop - reduceHours[0].start) * 60;
};

const getReducedMoment = (date) => {
    const m = moment.utc(date);
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

//TODO: Seems to be lacking index 1 sometimes... but always same last index.
Array.prototype.pad = function(maxLength) {
    for (let i = 0; i < this.length; i++) {
        let numberOfValuesToPad = maxLength - this[i].length;
        for(let x = 0; x < numberOfValuesToPad; x++) {
            let indexToUse = this[i].length - 1;
            let valueToPadWith = this[i][indexToUse];
            this[i].push(valueToPadWith);
        }
    }
};

const lineChartData = (from, dataSeries) => {
    const timeArray = createTimeArray(from);
    for(let i = 0; i < dataSeries.length; i++) {
        timeArray.add(dataSeries[i], i + 1);
    }
    timeArray.clean();
    timeArray.pad(maxLength(timeArray));

    return timeArray;
};

module.exports = { lineChartData}