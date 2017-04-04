const assert = require('assert');
const expect = require('chai').expect;
const dataHandler2 = require('../../app/client/dataHandler2');
const moment = require('moment');

const testDataSeries = [
    [{date: moment().subtract(2, 'h').toDate(), value: 0},
    {date: moment().subtract(1, 'h').toDate(), value: 5},
    {date: moment().subtract(1, 'h').toDate(), value: 10},
    {date: moment().subtract(0, 'h').toDate(), value: 20}],
    [{date: moment().subtract(2, 'h').toDate(), value: 0},
    {date: moment().subtract(1, 'h').toDate(), value: -10},
    {date: moment().subtract(0, 'h').toDate(), value: -20}]
];

describe('DataHandler2', function() {
  describe('LineChartData', function() {
  	const lineChartData = dataHandler2.lineChartData(testDataSeries, moment().subtract(30, 'd'), 60);
    it('should should have two sensors', function() {
      assert.equal(2, lineChartData.length);
    });
  });
});