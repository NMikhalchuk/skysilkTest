(function () {
    'use strict';

    angular.module('app')
        .factory('Task', Task);

    Task.$inject = [];

    /**
     *
     */
    function Task() {
        /**
         * Task object
         *
         * @param {object} inParams
         * @constructor
         */
        return function task(inParams) {
            this.id = 0;
            this.calendarId = 0;
            this.title = '';
            this.description = '';

            if (!inParams.calendarId) {
                throw new Exception('Calendar ID is required!');
            }

            if (!inParams.id) {
                inParams.id = String(this.calendarId) + String(Math.round(Math.random() * 1e10));
            }

            Helper.initProps.call(this, inParams);
        }
    }

})();