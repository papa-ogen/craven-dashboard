'use strict';

var expect = require('chai').expect;
import Countdown from './Countdown';

describe('Countdown', function() {
    it('should exist', function() {
        expect(Countdown).to.not.be.undefined;
    });
});

describe('#calculateReportDay()', function() {
    it('Calculate report day of current month', function() {
      let currentDate = new Date('2017-04-14');
      let CD = new Countdown({ reportDay: 25 }, currentDate);

      CD.calculateReportDay();

      let actual = CD.getReportDay(),
          expected = 25;

      expect(actual).to.equal(expected);

      /*
      * If reportDay is on a weekend
      */
      currentDate = new Date('2017-03-25');
      CD = new Countdown({ reportDay: 25 }, currentDate);

      CD.calculateReportDay();

      actual = CD.getReportDay(),
      expected = 24;

      expect(actual).to.equal(expected);
    });
});
