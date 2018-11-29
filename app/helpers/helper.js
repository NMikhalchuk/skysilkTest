/**
 * HELPER
 */

window.Helper = {

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