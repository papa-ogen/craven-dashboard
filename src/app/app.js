/* global require*/
/* eslint no-undef: "error"*/
require('flexboxgrid');
require('./scss/main.scss');
require('./index.html');

import DBConfig from '../data/DBconfig';
import Links from './js/Links';
import Countdown from './js/Countdown';

let CD = new Countdown(DBConfig.countdown, new Date());
let L = new Links(DBConfig.links);
