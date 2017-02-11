const moment = require('moment');
const reduceInMinutes = 4 * 60;

const reduceHourMap = {
    2: { start: 0, stop: 4 },
    6: { start: 4, stop: 8 },
    10: { start: 8, stop: 12 },
    14: { start: 12, stop: 16 },
    18: { start: 16, stop: 20 },
    22: { start: 20, stop: 24 }
};

const isInside = (momentToAggregateTo, currentMoment) => {
    let diffInMs = currentMoment.diff(momentToAggregateTo);
    var diffInMinutes =  moment.duration(diffInMs).asMinutes();
    if (diffInMinutes < reduceInMinutes) {
        return true;
    }
    return false;
};

const getMomentToAggregateTo = (currentMoment) => {
    let hour = currentMoment.hours;
    for (let i = 0; i < reduceHourMap.length; i++) {
        console.log(reduceHourMap[i].start);
        console.log(hour);
        if (hour >= reduceHourMap[i].start && hour < reduceHourMap[i].stop) {
            let ret = moment(currentMoment);
            ret.hours(10);
            console.log(ret.toDate());
            return ret;
        }
    }
};

const reduce = (dataSerie) => {
    let momentToAggregateTo = undefined;
    for(let i = 0; i < dataSerie.length; i++) {
        if (!momentToAggregateTo) {
            momentToAggregateTo = getMomentToAggregateTo(moment(dataSerie[i].date));
        }

        currentMoment = moment(dataSerie[i].date);
        if (isInside(momentToAggregateTo, currentMoment)) {
            console.log('same agg');
        } else {
            console.log('new time');
        }
        console.log(momentToAggregateTo.toDate());
    }
};



/*
const reduce = (dataSerie) => {
    let reduced = [];
    
    let startMoment = undefined;
    let runningValue;
    let x = 1;
    for (let i = 0; i < dataSerie.length; i++) {
        let reading = dataSerie[i];
        if (!startMoment) {
            startMoment = moment(reading.date);
            console.log(startMoment);
        }

        thisMoment = moment(reading.date);
        let duration = moment.duration(thisMoment.diff(startMoment));
        let minutes = duration.asMinutes();
        console.log('min', minutes);
        if (minutes < reduceInMinutes) {
            let readings = {
                date: startMoment.toDate(),
                value: Number.parseFloat(runningValue / x)
            };
            reduced.push(readings);

            x = 0;
            startMoment = undefined;
        } else {
            runningValue += Number.parseFloat(reading.value);
        }
        if(i == dataSerie.length - 1 && x != 0){
            let readings = {
                date: startMoment.toDate(),
                value: Number.parseFloat(runningValue / x)
            };
            reduced.push(readings);            
        }

        console.log('ThisMoment', thisMoment.toDate());
        console.log('Running value', runningValue);
        console.log('X', x);
        x++;
    }
    return reduced;
};
*/

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


const inDataTemp = [ { 
    date: '2017-02-10T13:57:36.211Z',
    sensorId: 135,
    severity: 0,
    value: 10 },
  {
    date: '2017-02-10T14:57:28.991Z',
    sensorId: 135,
    severity: 0,
    value: 20 },
  {
    date: '2017-02-10T18:30:02.291Z',
    sensorId: 135,
    severity: 0,
    value: 0 },
  { 
    date: '2017-02-10T19:29:29.010Z',
    sensorId: 135,
    severity: 0,
    value: 10 } ];


//date, temp, temp outdoors
const outData = [
    [new Date(2017, 1, 1), 20, 10],
    [new Date(2017, 1, 5), 18, 5],
    [new Date(2017, 1, 10), 16, 0],
    [new Date(2017, 1, 15), 22, 12]
  ];

console.log('reduced', reduce(inDataTemp));