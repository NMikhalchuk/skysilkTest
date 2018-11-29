(function () {
    'use strict';

    angular.module('app')
        .factory('CalendarItem', CalendarItem);

    CalendarItem.$inject = [];

    /**
     *
     */
    function CalendarItem() {

        /**
         * CalendarItem
         *
         * @param inParams
         * @constructor
         */
        return function calendarItem (inParams) {
            this.id = 0;
            this.caption = '';
            this.active = false;
            this.canAddTask = false;
            this.tasks = [];

            Helper.initProps.call(this, inParams);

            /**
             * @param taskId
             */
            this.getTaskById = function (taskId) {
                var task = this.tasks.filter(function (item) {
                    return item.id === taskId;
                });

                return task.length ? task[0] : {};
            };
        };
    }

})();