const moment = require('moment');
const Stopwatch = require('timer-stopwatch'); 

/*
const reduceMoment = (moment, hours) => {
    if (hours) {
        moment.hours(0);    
    }
    moment.minutes(0);
    moment.seconds(0);
    moment.milliseconds(0);
    
    return moment;
};*/

const mySum = (acc, current) => {
    return acc + current.value
};

const average = (array) => {
    if (array.length > 1) {
        let sum = array.reduce(mySum);
        return sum / array.length;  
    } else if (array.length === 1) {
        return array[0].value;
    } else {
        return undefined;
    }
}

const match = (current, aggregateOnMinutes) => {
    return (entry) => {
        let entryMoment = moment(entry.date);
        let diffMs = Math.abs(entryMoment.diff(current));
        let max = aggregateOnMinutes * 60 * 1000
        return diffMs <= max;
    };
};

const lineChartData = (dataSeries, from, aggregateOnMinutes) => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    const ret = new Array();

    const stop = moment();
    const current = from.clone();
    while (current <= stop) {
        let entry = new Array();
        entry.push(current.toDate());
        for(let i = 0; i < dataSeries.length; i++) {
            let matches = dataSeries[i].filter(match(current, aggregateOnMinutes));
            let avg = average(matches);
            entry.push(avg);
        }
        ret.push(entry);        
        current.add(aggregateOnMinutes, 'm');
    }
    return ret;
};

const testDataSeries = [
    [{date: moment().subtract(2, 'h').toDate(), value: 0},
    {date: moment().subtract(1, 'h').toDate(), value: 5},
    {date: moment().subtract(1, 'h').toDate(), value: 10},
    {date: moment().subtract(0, 'h').toDate(), value: 20}],
    [{date: moment().subtract(2, 'h').toDate(), value: 0},
    {date: moment().subtract(1, 'h').toDate(), value: -10},
    {date: moment().subtract(0, 'h').toDate(), value: -20}]
];
lineChartData(testDataSeries, moment().subtract(3, 'h').subtract(1, 's'), 60);

module.exports = { lineChartData}