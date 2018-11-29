(function () {
    'use strict';

    angular.module('app')
        .service('taskService', taskService);

    taskService.$inject = ['Task', 'localStorageService'];

    /**
     *
     * @param Task
     * @param storage
     */
    function taskService(Task, storage) {

        /**
         *
         * @param form
         * @param needDelete
         */
        this.save = function save(form, needDelete) {
            var taskList = JSON.parse(storage.get(form.calendarId) || '[]');

            if (!form.id) {
                taskList.push(new Task({
                    calendarId: form.calendarId,
                    title: form.title,
                    description: form.description
                }));
            } else {
                var delIndex = -1;

                taskList.forEach(function (item, index) {
                    if ((item.id === form.id)) {
                        taskList[index] = new Task({
                            id: form.id,
                            calendarId: form.calendarId,
                            title: form.title,
                            description: form.description
                        });
                        delIndex = index;
                    }
                });

                if (needDelete) {
                    taskList.splice(delIndex, 1);
                }
            }

            storage.set(form.calendarId, JSON.stringify(taskList));
        };

        /**
         *
         * @param form
         */
        this.delete = function deleteTask(form) {
            this.save(form, true);
        };
    }

})();