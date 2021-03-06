/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Module dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

module.exports = function(app) {
  // Configure Express
  app.use(require('express-status-monitor')());
  app.set('view engine', 'ejs');
  require('ejs').delimiter = '$';
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Setup static public directory
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Only loaded when SECURE_EXPRESS is `true`
  if (process.env.VCAP_APPLICATION) {
    require('./security')(app);
  }
};
