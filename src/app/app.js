/* global require*/
/* eslint no-undef: "error"*/
require('flexboxgrid');
require('./scss/main.scss');

// import Account from './js/Account';
// import Links from './js/Links';
import Countdown from './js/Countdown';

let CD = new Countdown({reportDay: 25}, new Date('2017-03-04'));
CD.calculateReportDay();
