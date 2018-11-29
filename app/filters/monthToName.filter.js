(function() {
    'use strict';

    angular.module('app')
        .filter('monthToName', monthToName);


    function monthToName() {
        return function (input) {
            var d = new Date();

            d.setMonth(input);
            return [Helper.getMonthName(d), d.getFullYear()].join(' ');
        };
    }

})();