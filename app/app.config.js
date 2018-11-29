(function() {
    'use strict';

    angular.module('app')
        .config(config);

    function config (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('nmikhalchukTestApp')
            .setStorageType('sessionStorage')
            .setNotify(true, true);
    }

})();