/* global require*/
/* eslint no-undef: "error"*/
require('flexboxgrid');
require('./scss/main.scss');
require('./index.html');

// import Account from './js/Account';
// import Links from './js/Links';
import Countdown from './js/Countdown';

let CD = new Countdown({reportDay: 25}, new Date('2017-04-27'));
CD.calculateDaysLeft();
