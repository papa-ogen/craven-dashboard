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

      let actual = CD.getReportDay().getTime();
      let d = new Date('2017-04-14');
      d.setDate(25);
      let expected = d.getTime();

      expect(actual).to.equal(expected);

      /*
      * If reportDay is on a saturday
      */
      currentDate = new Date('2017-03-10');
      CD = new Countdown({ reportDay: 25 }, currentDate);

      actual = CD.getReportDay().getTime();
      d = new Date('2017-03-10');
      d.setDate(24); // 25 is on a saturday
      expected = d.getTime();

      expect(actual).to.equal(expected);

      /*
      * If reportDay is on a sunday
      */
      currentDate = new Date('2016-12-03');
      CD = new Countdown({ reportDay: 25 }, currentDate);

      actual = CD.getReportDay().getTime();
      d = new Date('2016-12-03');
      d.setDate(23); // 25 is on a sunday
      expected = d.getTime();

      expect(actual).to.equal(expected);

      /*
      * If reportDay is next month
      */
      // currentDate = new Date('2017-04-10');
      // CD = new Countdown({ reportDay: 25 }, currentDate);
      //
      // actual = new Date('2017-04-10');
      // actual.setMonth(4);
      // d = new Date('2017-04-10');
      // d.setMonth(4); // may
      // expected = d.getTime();
      //
      // expect(actual).to.equal(expected);
    });
});

describe('#countDownMarkup()', function() {
  it('should take a message and return a string', function() {
    let CD = new Countdown({ message: "Hello World" });
    let actual = CD.countDownMarkup(),
        expected = `<div class="row center-xs db-countdown">
<div class="col-xs-12 col-md-6"><div class="box">Hello World</div></div>
</div>`;
    expect(actual).to.equal(expected);
  });
});

describe('#isReportDay()', function() {
    it('is today report day', function() {
      let currentDate = new Date('2017-04-25');
      let CD = new Countdown({ reportDay: 25 }, currentDate);

      let actual = CD.isReportDay;

      expect(actual).to.be.true;

      /*
      * If not reportDay
      */
      currentDate = new Date('2017-03-01');
      CD = new Countdown({ reportDay: 25 }, currentDate);

      actual = CD.isReportDay;

      expect(actual).to.be.false;
    });
});

describe('#daysleft', function() {
    it('how many days left to submit time report', function() {
      let CD = new Countdown({ reportDay: 25 }, new Date('2017-04-05')),
      actual = CD.daysLeft,
      expected = 20;

      expect(actual).to.equal(expected);

      /*
      * If day is passed, look at next month
      */
      CD = new Countdown({ reportDay: 25 }, new Date('2017-04-26')),
      actual = CD.daysLeft,
      expected = 29;

      expect(actual).to.equal(expected);
    });
});
