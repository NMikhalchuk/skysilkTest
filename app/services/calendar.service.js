(function () {
    'use strict';

    angular.module('app')
        .service('calendarService', calendarService);

    calendarService.$inject = ['localStorageService', 'CalendarItem'];

    /**
     *
     * @param storage
     * @param CalendarItem
     * @return {calendarService}
     */
    function calendarService(storage, CalendarItem) {
        /**
         * getHeader
         * @return {string[]}
         */
        this.getHeader = function () {
            return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        };

        /**
         *
         * @param {Object} params
         */
        this.create = function (params) {
            var day = params.date.getDate(),
                item = this.load(params.date.getTime()),
                today = new Date();

            item.active = Boolean(params.active);
            item.caption = day + ' ' + (day === 1 ? Helper.getMonthName(params.date, true) : '');
            item.canAddTask = (today.getTime() - (24 * 3600 * 1000)) < params.date.getTime();

            return item;
        };

        /**
         *
         * @param id
         * @return {CalendarItem}
         */
        this.load = function (id) {
            var date = new Date(id),
                day = date.getDate();

            return new CalendarItem({
                id: id,
                caption: day,
                active: false,
                tasks: JSON.parse(storage.get(id) || '[]')
            });
        };

        /**
         *
         * @param inDate
         * @return {Array}
         */
        this.getItems = function (inDate) {
            var cols = 7,
                items = [],
                firstDayOfWeek = new Date(inDate.getFullYear(), inDate.getMonth(), 1).getDay(),
                prevMonth = Helper.getPrevMonthDate(inDate),
                prevMonthDays = Helper.getDaysInMonth(prevMonth),
                currentDays = Helper.getDaysInMonth(inDate),
                nextMonth = Helper.getNextMonthDate(inDate);

            // fill prev month days
            for (var i = -(firstDayOfWeek - 1); i <= 0; i++) {
                items.push(this.create({
                    date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonthDays + i),
                    active: false,
                    canAddTask: false
                }));
            }

            // fill current month days
            for (var i = 1; i <= currentDays; i++) {
                items.push(this.create({
                    date: new Date(inDate.getFullYear(), inDate.getMonth(), i),
                    active: true,
                    canAddTask: true
                }));
            }

            // fill next month days
            for (var i = 1, to = cols - (items.length % cols); to !== cols && i <= to; i++) {
                items.push(this.create({
                    date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i),
                    active: false,
                    canAddTask: true
                }));
            }

            return items;
        };
    }

})();