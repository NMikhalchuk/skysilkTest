/*(function () {
    'use strict';
*/
/*
    var angular = require('angular');
    require('angular-local-storage');

    require('../app/controllers/main.controller.js');
    require('../app/controllers/task.controller.js');
    require('../app/factories/calendar.factory.js');
    require('../app/factories/task.factory');
    require('../app/services/calendar.service');
    require('../app/services/task.service');
    require('../app/helpers/helper');
*/
    var ngModule = angular.module('app', ['LocalStorageModule'])

            .filter('monthToName', function () {
                return function (input) {
                    var d = new Date();

                    d.setMonth(input);
                    return [Helper.getMonthName(d), d.getFullYear()].join(' ');
                };
            })

    ;

//})();


