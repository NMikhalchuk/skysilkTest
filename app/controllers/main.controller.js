(function() {
    'use strict';

    angular.module('app')
        .controller('MainController', mainController);

    mainController.$inject = ['$scope', 'calendarService'];

    /**
     *
     * @param $scope
     * @param calendarService
     */
    function mainController ($scope, calendarService) {
        this.items = [];
        this.init = init;
        this.prevMonth = prevMonth;
        this.nextMonth = nextMonth;
        this.openModal = openModal;
        this.getHeader = calendarService.getHeader;

        $scope.$on('update', function () {
            this.init(this.currentMonth);
        }.bind(this));


        /**
         * Init
         * @param currentMonth
         */
        function init(currentMonth) {
            var currentDate = new Date();

            this.currentMonth = currentMonth || currentDate.getMonth();
            this.items = calendarService.getItems(new Date(currentDate.getFullYear(), this.currentMonth));
        }

        /**
         * Update month
         */
        function prevMonth() {
            this.init(this.currentMonth - 1);
        }

        /**
         * monthNext
         */
        function nextMonth() {
            this.init(this.currentMonth + 1);
        }

        /**
         * Add Task
         * @param calendarId
         * @param taskId
         */
        function openModal(calendarId, taskId) {
            $scope.$broadcast('fillTaskModal', {
                id: taskId || null,
                calendarId: calendarId
            });

        }

    }

})();