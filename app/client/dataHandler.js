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
    const m = moment(date);
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

const createTimeArray = (from, to = new Date()) => {
    const start = getReducedMoment(from);
    const stop = getReducedMoment(to);

    let ret = new Array();
    let currentMoment = start;
    while (currentMoment <= stop)
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

const lineChartData = (from, dataSeries) => {
    const timeArray = createTimeArray(from);
    for(let i = 0; i < dataSeries.length; i++) {
        timeArray.add(dataSeries[i], i + 1);
    }
    timeArray.clean();
    return timeArray;
};

const createTestDataSeries = (from, to = new Date()) => {
    const start = moment(from);
    start.hours = 0 + Math.round(23 * Math.random());
    start.minutes = 0;
    const stop = moment(to);
    stop.hours = 0;
    stop.minutes = 0;

    const ret = new Array()
    let currentMoment = start;
    while (currentMoment <= stop)
    {
        const value = {'date': currentMoment.toDate(), 'value': Math.round(99 * Math.random()) };
        ret.push(value)
        currentMoment.add(400, 'm');
    }
    return ret;
};

const test = () => {
    const from = new Date('2017-03-08');

    let testData = createTestDataSeries(from);
    let testData2 = createTestDataSeries(from);
    let testData3 = createTestDataSeries(from);

    let ret = lineChartData(from, [testData, testData2, testData3])
    return ret;
};
//test();

module.exports = { lineChartData, test }