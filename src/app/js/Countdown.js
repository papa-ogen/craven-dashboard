/* global document */
/* eslint no-undef: "error" */

/**
* Countdown
*/
class Countdown {
  /**
   * @constructor
   * @param {object} countdown Countdown config.
   * @param {date} date Current date.
   */
  constructor(countdown, date) {
    this.today = date !== undefined ? date : new Date();
    this.reportDay = this.calculateReportDay(this.today, countdown.reportDay);
    this.isReportDay = this.today.getTime() === this.reportDay.getTime();
    this.daysLeft = this.calculateDaysLeft();
    this.message = countdown.message !== undefined ?
                   countdown.message :
                   'Please submit your timesheet today';

    if(this.isReportDay) {
      let body = document.getElementsByTagName('body')[0];
      let div = document.createElement('div');
      div.innerHTML = this.countDownMarkup();
      body.insertBefore(div, body.firstChild);
    }

    // if(this.daysLeft) {
    //   let div = document.getElementsByClassName('db-countdown-text')[0];
    //   let span = div.getElementsByTagName('span')[0];
    //   span.innerHTML = this.daysLeft;
    // }
  }

  /**
  * calculate reportDay based on it being on a weekend or not
  * @param {date} today Current date
  * @param {number} reportDay Day to report
  * @return {date}
  */
  calculateReportDay(today, reportDay) {
    let d = new Date(today);

    if(reportDay === 'last') reportDay = this.lastDayOfMonth();
    d.setDate(reportDay);

    if(d.getDay() === 6) {
      d.setDate(24);
      return d;
    } else if(d.getDay() === 0) {
      d.setDate(23);
      return d;
    } else return d;
  }

  /**
  * get calculatedReportDay
  * @return {number} - this.calculatedReportDay
  */
  getReportDay() {
    return this.reportDay;
  }

  /**
  * calculate days left before time report
  * @return {number} - days left
  */
  calculateDaysLeft() {
    let d1 = this.today;
    let d2 = this.reportDay;
    let diff = new Date(d2.getTime() - d1.getTime());

    if(diff < 0) {
      let nextReportDay = this.calculateReportDay(this.getNextMonth(d1),
      d2.getDate());
      let _second = 1000;
      let _minute = _second * 60;
      let _hour = _minute * 60;
      let _day = _hour * 24;
      let distance = nextReportDay - d1;
      let days = Math.floor(distance / _day);

      return days;
    }

    return diff.getUTCDate()-1;
  }

  /**
  * get next month
  * @param {date} currentDate - current date
  * @return {date} - next month
  */
  getNextMonth(currentDate) {
    let nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);

    return nextMonth;
  }

  /**
  * last day of current month
  * @param {date} currentDate - current date
  * @return {number} - last day
  */
  lastDayOfMonth() {
    let year = this.today.getFullYear(),
        month = this.today.getMonth(),
        day = this.today.getDate();
    let nextMonth = new Date(year, month+1, 1);
    let d = new Date(nextMonth - 1);

    return d.getDate();
  }

  /**
  * Markup
  @return {string} - header markup
  */
  countDownMarkup() {
   return `<div class="row center-xs db-countdown">
<div class="col-xs-12 col-md-6"><div class="box">${this.message}</div></div>
</div>`;
  }
}

/* exported Countdown */
export default Countdown;
