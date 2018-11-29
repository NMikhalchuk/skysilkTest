(function() {
    'use strict';

    angular.module('app')
        .controller('TaskController', taskController);

    taskController.$inject = ['$scope', 'taskService', 'calendarService'];

    /**
     *
     * @param $scope
     * @param taskService
     * @param calendarService
     */
    function taskController ($scope, taskService, calendarService) {
        $scope.calendar = {};

        $scope.task = {};

        $scope.$on('fillTaskModal', function (event, params) {
            $scope.saveButtonText = 'Create';
            $scope.task = {};

            if (params.id) {
                var item = calendarService.load(params.calendarId);

                $scope.task = item.getTaskById(params.id);
                $scope.saveButtonText = 'Save changes';
            }

            $scope.task.id = params.id;
            $scope.task.calendarId = params.calendarId;
            $scope.task.date = new Date(params.calendarId).toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            //$scope.title = task.title;
            //$scope.description = task.description;
        });

        /**
         * save
         */
        $scope.save = function () {
            taskService.save($scope.task);
            $scope.$emit('update');
        };

        /**
         * delete
         */
        $scope.delete = function () {
            taskService.delete($scope.task);
            $scope.$emit('update');
        };
    }


})();