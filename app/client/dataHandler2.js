const moment = require('moment');

const reduceMoment = (moment, hours) => {
    if (hours) {
        moment.hours(0);    
    }
    moment.minutes(0);
    moment.seconds(0);
    moment.milliseconds(0);
    
    return moment;
};

const average = (array) => {
    let sum = array.reduce((x, y) => x.value + y.value);
    return sum / array.length;
}

const match = (moment, aggregateOnMinutes) => {
    return (entry) => {
        let entryMoment = moment(entry.date);
        let diffMs = entryMoment.diff(moment);
        return diffMs <= aggregateOnMinutes * 60 * 1000;
    };
};

const lineChartData = (dataSeries, from, aggregateOnMinutes) => {
    const stopwatch = new Stopwatch();
    stopwatch.start();

    const now = moment();
    const currentMoment = reduceMoment(from.clone(), true);
    
    const ret = new Array();
    while (currentMoment < now)
    {
        let entry = new Array();
        entry.push(currentMoment.toDate());
        for(let i = 0; i < dataSeries.length; i++) {
            let matches = dataSeries[i].filter(match(currentMoment, aggregateOnMinutes));
            let average = average(matches);
            entry.push(average);
        }
        ret.push(entry);        
        currentMoment.add(aggregateOnMinutes, 'm');
    }
};

module.exports = { lineChartData}