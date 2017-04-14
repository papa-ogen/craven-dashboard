/**
* Countdown
*/
class Countdown {
  /**
  * @constructor
  * @param {object} countdown- countdown object
  * @param {object} date - new Date()
  */
  constructor(countdown, date) {
    this.reportDay = countdown.reportDay;
    this.calculatedReportDay = null;
    this.currentDate = date !== undefined ? date : new Date();
  }

  calculateReportDay() {
    this.currentDate.setDate(this.reportDay);

    if(this.currentDate.getDay() === 6) {
      this.calculatedReportDay = 24;
    }
    else if(this.currentDate.getDay() === 0) {
      this.calculatedReportDay = 24;
    } else {
      this.calculatedReportDay = this.reportDay;
    }
  }

  getReportDay() {
    return this.calculatedReportDay;
  }
}

/* global module*/
/* eslint no-undef: "error"*/
export default Countdown;
