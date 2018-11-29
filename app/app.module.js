(function () {
    'use strict';

    var angular = require('angular');

    angular.module('app', ['LocalStorageModule']);

    require('angular-local-storage');
    require('../app/helpers/helper');
    require('../app/controllers/main.controller');
    require('../app/controllers/task.controller');
    require('../app/factories/calendar.factory');
    require('../app/factories/task.factory');
    require('../app/services/calendar.service');
    require('../app/services/task.service');
    require('../app/filters/monthToName.filter');

})();


