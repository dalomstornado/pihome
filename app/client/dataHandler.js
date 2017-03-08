const moment = require('moment');

const reduceInMinutes = 4 * 60;
const reduceHours = 
    [{ start: 0, hour: 2, stop: 4 },
    { start: 4, hour: 6, stop: 8 },
    { start: 8, hour: 10, stop: 12 },
    { start: 12, hour: 14, stop: 16 },
    { start: 16, hour: 18, stop: 20 },
    { start: 20, hour: 22, stop: 24 }];

const isInside = (momentToAggregateTo, currentMoment) => {
    let diffInMs = currentMoment.diff(momentToAggregateTo);
    let diffInMinutes =  moment.duration(diffInMs).asMinutes();
    if (diffInMinutes < reduceInMinutes) {
        return true;
    }
    return false;
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
}

const createTimeArray = (from, to = new Date()) => {
    const start = getReducedMoment(from);
    const stop = getReducedMoment(to);
    console.log('stop', stop.toDate());

    let ret = new Array();
    let currentMoment = start;
    while (currentMoment <= stop)
    {
        ret.push([currentMoment.toDate()])
        currentMoment = currentMoment.add(reduceInMinutes, 'm');
    }

    return ret;
};

const addTo = (timeArray, dataSerie) => {
    let numberOfValues = 1;
    let runningValue;
    for(let i=0; i < dataSerie.length; i++)
    {
        let m = getReducedMoment(dataSerie[i].date);
        for (let x = 0; x < timeArray.length; x++){
            let m2 = moment(timeArray[x][0]);
            if (m.isSame(m2)){
                timeArray[x][banan] += dataSerie[i].value / 2;
            }
            if (!m2.isSame(m)){
                timeArray .add()
                numberOfValues = 1;
            }
        }
        numberOfValues++;
    }
}

const getMomentToAggregateTo = (currentMoment) => {
    let hour = currentMoment.hours();
    for (let i = 0; i < reduceHours.length; i++) {
        if (hour >= reduceHours[i].start && hour < reduceHours[i].stop) {
            let ret = moment(currentMoment);
            ret.hours(reduceHours[i].hour);
            ret.minutes(0);
            ret.seconds(0);
            ret.milliseconds(0);

            return ret;
        }
    }
};

const reduce = (dataSerie, outputMap = new Map(), entryIndex = 0) => {
    let momentToAggregateTo = undefined;
    let runningValue = undefined;
    let x = undefined;
    let entry = undefined;

    for(let i = 0; i < dataSerie.length; i++) {
        if (!momentToAggregateTo) {
            momentToAggregateTo = getMomentToAggregateTo(moment(dataSerie[i].date));
            x = 0;
            runningValue = 0;
        }
        
        let currentMoment = moment(dataSerie[i].date);
        if (isInside(momentToAggregateTo, currentMoment)) {
            x++;
            runningValue += dataSerie[i].value;
        } else {
            entry = outputMap.get(momentToAggregateTo.toString());
            if (!entry) {
                entry = new Array(entryIndex + 1); //Not needed to sizw, js apperently works on dynamic arrays
                outputMap.set(momentToAggregateTo.toString(), entry);
            }
            entry[entryIndex] = runningValue / x;
            momentToAggregateTo = undefined;
            i--;
        }
    }
    //Adds the last (that was not added during else)
    outputMap.set(momentToAggregateTo.toString(), entry);
    return outputMap;
};

const convertMapToArray = (map) => {
    let keys = Array.from(map.keys());
    let ret = new Array();
    for(let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let entry = map.get(key);
        let newEntry = [new Date(key)];
        for(let x = 0; x < entry.length; x++){
            newEntry.push(entry[x]);
        }
        ret.push(newEntry);
    }
    return ret;
};

const convertLineChartFriendlyArray = (dateSerie, dataSerieRef) => {
    if (dateSerie.length != dataSerieRef.length) {
        conole.log('Different length on series!');
    }
    let dataRows = [];
    for(let i = 0; i < dataSerie.length; i++){
        let row = [ dataSerie[i].date, dataSerie[i].value, dataSerieRef[i].value ];
        dataRows.push(row);
    }
    return dataRows;
}

const convertRawDataToLineChartFriendly = (data, referenceData) => {
    let map = reduce(data);
    map = reduce(referenceData, map, 1);
    return convertMapToArray(map);
};

console.log('timeArray', createTimeArray(moment('2017-03-01')));

module.exports = { convertRawDataToLineChartFriendly }