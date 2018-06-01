'use strict'
let DaysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

Vue.component('day-item', {
    template: '<day-item></day-item>'
})

let vm = new Vue({
    el: '#calendar',
    data: {
        // dateobj: new Date(),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        // year: this.dateobj.getFullYear(),
        // month: this.dateobj.getMonth() + 1,
        days: [],
        daySelected: new Date().getDay(),
        monthList: [],
        yearList: [],
        choosingMonth: false,
        choosingYear: false
    },
    created: function () {
        this.FillDates(this.year, this.month);
        // fill month-choosing box
        for (let i = 1; i <= 12; ++i) {
            this.monthList.push(i);
        }
        // fill year-choosing box
        for (let i = 1970; i <= 2100; ++i) {
            this.yearList.push(i);
        }
    },
    methods: {
        FillDates: function (year, month) {
            console.log(year,month);
            this.days = [];
            let date = new Date(this.FormatDate(year, month, 1));
            let firstWeekday = new Date(this.FormatDate(year, month, 1)).getDay();
            let reapFlag = this.IsReapYear(year);
            // add days of this month into arr
            for (let i = 1;i <= ((reapFlag && month == 2) ? DaysOfMonth[month-1] + 1 : DaysOfMonth[month-1]); ++i) {
                let weekday = new Date(this.FormatDate(year, month, i)).getDay();
                this.days.push({
                    date: i,
                    isWeekend:  weekday === 0 || weekday === 6,
                    isThisMonth: true,
                    isSelected: false,
                    isToday: year == new Date().getFullYear() && month == new Date().getMonth() + 1 && i == new Date().getDate()
                });
            }
            // add days of previous month into arr
            let pre = [];
            for(let i = 0;i < firstWeekday; ++i) {
                if(month != 1) {
                    pre.push({
                        date: DaysOfMonth[month-2] - i,
                        isWeekend:  false,
                        isThisMonth: false,
                        isSelected: false,
                        isToday: false
                    });
                }
                else {
                    pre.push({
                        date: DaysOfMonth[11] - i,
                        isWeekend:  false,
                        isThisMonth: false,
                        isSelected: false,
                        isToday: false
                    });
                }
            }
            this.days = pre.reverse().concat(this.days);
            // add days of the next month into arr
            for(let i = this.days.length, d = 1; i < 42; ++i) {
                this.days.push({
                    date: d++,
                    isWeekend:  false,
                    isThisMonth: false,
                    isSelected: false,
                    isToday: false
                });
            }
        },
        FillPreYear: function () {
            this.year--;
            this.FillDates(this.year, this.month);
            this.daySelected = -1;           
        },
        FillPreMonth: function () {
            let _this = this; //needless?
            if (_this.month == 1) {
                _this.month = 12;
                _this.year--;
            }
            else {
                _this.month--;
            }
            this.FillDates(this.year, this.month);
            this.daySelected = -1;
        },
        FillNextMonth: function () {
            // let _this = this;
            if (this.month == 12) {
                this.month = 1;
                this.year++;
            }
            else {
                this.month++;
            }
            this.FillDates(this.year, this.month);
            this.daySelected = -1;
        },
        FillNextYear: function () {
            this.year++;
            this.FillDates(this.year, this.month);
            this.daySelected = -1;
        },
        SetDates: function (year, month) {
            this.year = year;
            this.month = month;
            this.FillDates(year, month);
            this.ClearChoosing();
        },
        SelectDay: function (index) {
            this.daySelected = index;
        },
        // format date as yyyy-mm-dd
        FormatDate: function (y, m, d) {
            return `${y}-${(m > 9) ? m : '0' + m}-${d}`;
        },
        IsReapYear: function (year) {
            return year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 1 : 0;
        },
        ChooseYear: function () {
            this.choosingMonth = false;
            this.choosingYear = !this.choosingYear;
        },
        ChooseMonth: function () {
            this.choosingYear = false;
            this.choosingMonth = !this.choosingMonth;
        },
        ClearChoosing: function () {
            this.choosingYear = false;
            this.choosingMonth = false;
        }
    }
})