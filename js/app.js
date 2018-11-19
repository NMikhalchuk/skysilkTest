angular.module('app', ['LocalStorageModule'])

    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('nmikhalchukTestApp')
            .setStorageType('sessionStorage')
            .setNotify(true, true);
    })

    .controller('MainController', ['$scope', 'localStorageService', function ($scope, localStorageService) {
        $scope.items = [];

        // init objects storage
        CalendarItem.storage = localStorageService;
        Task.storage = localStorageService;

        /**
         * Init
         * @param currentMonth
         */
        $scope.init = function (currentMonth) {
            var currentDate = new Date();

            $scope.currentMonth = currentMonth || currentDate.getMonth();
            $scope.items = CalendarItem.getItems(new Date(currentDate.getFullYear(), $scope.currentMonth));
        };

        /**
         * Update month
         */
        $scope.monthUpdate = function () {
            $scope.init($scope.currentMonth);
        };

        /**
         * Add Task
         * @param calendarId
         * @param taskId
         */
        $scope.openModal = function (calendarId, taskId) {
            $scope.$broadcast('fillTaskModal', {
                id: taskId,
                calendarId: calendarId
            });

        };

        $scope.$on('update', $scope.monthUpdate);

    }])

    .filter('monthToName', function () {
        return function (input) {
            var d = new Date();

            d.setMonth(input);
            return [Helper.getMonthName(d), d.getFullYear()].join(' ');
        };
    })

    /**
     * TaskController
     */
    .controller('TaskController', ['$scope', 'localStorageService', function ($scope) {
        $scope.calendar = {};

        $scope.$on('fillTaskModal', function (event, params) {
            $scope.saveButtonText = 'Create';

            var task = {};
            if (params.id) {
                task = CalendarItem.load(params.calendarId).getTaskById(params.id);
                $scope.saveButtonText = 'Save changes';
            }

            $scope.id = params.id;
            $scope.calendarId = params.calendarId;
            $scope.date = new Date(params.calendarId).toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            $scope.title = task.title;
            $scope.description = task.description;

        });

        /**
         * save
         */
        $scope.save = function () {
            Task.save($scope);
            $scope.$emit('update');
        };

        /**
         * delete
         */
        $scope.delete = function () {
            Task.delete($scope);
            $scope.$emit('update');
        };
    }])
;


/**
 * CalendarItem model
 *
 * @param {object} inParams
 * @constructor
 */
function CalendarItem(inParams) {
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
        var taskList = CalendarItem.load(this.id).tasks;
        var task = taskList.filter(function (item) {
            return item.id === taskId;
        });

        return task.length ? task[0] : {};
    };

    return this;
}

/**
 * Static method
 * @param {Object} params
 */
CalendarItem.create = function (params) {
    var day = params.date.getDate(),
        item = CalendarItem.load(params.date.getTime()),
        today = new Date();

    item.active = Boolean(params.active);
    item.caption = day + ' ' + (day === 1 ? Helper.getMonthName(params.date, true) : '');
    item.canAddTask = (today.getTime() - (24 * 3600 * 1000)) < params.date.getTime();

    return item;
};

CalendarItem.load = function (id) {
    var date = new Date(id),
        day = date.getDate();

    return new CalendarItem({
        id: id,
        caption: day,
        active: false,
        tasks: JSON.parse(CalendarItem.storage.get(id) || '[]')
    });
};

CalendarItem.getItems = function (inDate) {
    var cols = 7,
        items = [],
        firstDayOfWeek = new Date(inDate.getFullYear(), inDate.getMonth(), 1).getDay(),
        prevMonth = Helper.getPrevMonthDate(inDate),
        prevMonthDays = Helper.getDaysInMonth(prevMonth),
        currentDays = Helper.getDaysInMonth(inDate),
        nextMonth = Helper.getNextMonthDate(inDate);

    // fill prev month days
    for (var i = -(firstDayOfWeek - 1); i <= 0; i++) {
        items.push(CalendarItem.create({
            date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonthDays + i),
            active: false,
            canAddTask: false
        }));
    }

    // fill current month days
    for (var i = 1; i <= currentDays; i++) {
        items.push(CalendarItem.create({
            date: new Date(inDate.getFullYear(), inDate.getMonth(), i),
            active: true,
            canAddTask: true
        }));
    }

    // fill next month days
    for (var i = 1, to = cols - (items.length % cols); to !== cols && i <= to; i++) {
        items.push(CalendarItem.create({
            date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i),
            active: false,
            canAddTask: true
        }));
    }

    return items;
};


/**
 * Task object
 *
 * @param {object} inParams
 * @constructor
 */
function Task(inParams) {
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
    return this;
}

Task.save = function ($taskController, needDelete) {
    var taskList = JSON.parse(Task.storage.get($taskController.calendarId) || '[]');

    if (!$taskController.id) {
        taskList.push(new Task({
            calendarId: $taskController.calendarId,
            title: $taskController.title,
            description: $taskController.description
        }));
    } else {
        var delIndex = -1;

        taskList.forEach(function (item, index) {
            if ((item.id === $taskController.id)) {
                taskList[index] = new Task({
                    id: $taskController.id,
                    calendarId: $taskController.calendarId,
                    title: $taskController.title,
                    description: $taskController.description
                });
                delIndex = index;
            }
        });

        if (needDelete) {
            taskList.splice(delIndex, 1);
        }
    }

    Task.storage.set($taskController.calendarId, JSON.stringify(taskList));
};

Task.delete = function ($taskController) {
    Task.save($taskController, true);
};


/**
 * HELPER
 */

var Helper = {

    /**
     * @param {Date} inDate
     * @return {number}
     */
    getDaysInMonth: function (inDate) {
        return new Date(inDate.getFullYear(), inDate.getMonth() + 1, 0).getDate();
    },

    /**
     * @param {Date} inDate
     * @return {Date}
     */
    getPrevMonthDate: function (inDate) {
        return new Date(inDate.getFullYear(), inDate.getMonth() - 1);
    },

    /**
     * @param {Date} inDate
     * @return {Date}
     */
    getNextMonthDate: function (inDate) {
        return new Date(inDate.getFullYear(), inDate.getMonth() + 1);
    },

    /**
     * @param {Date} inDate
     * @param {Boolean} isShort
     * @return {string}
     */
    getMonthName: function (inDate, isShort) {
        return inDate.toLocaleString('en-US', {month: isShort ? 'short' : "long"});
    },


    /**
     * @param inParams
     */
    initProps: function (inParams) {
        for (var p in inParams) {
            this[p] = inParams[p];
        }
    }
};