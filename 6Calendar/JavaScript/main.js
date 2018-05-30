'use strict'
const weekChinese = ['日', '一', '二', '三', '四', '五', '六'];
const doit = ['打球', '上分', '吃喝', '玩乐', '写bug', '念诗'];
const dontdoit = ['咸鱼', '发呆', '开黑', '减肥', '熬夜'];
let daySelected;
const date = new Date();
let month = date.getMonth () + 1;
let year = date.getFullYear ();
let today = date.getDate ();
let weekday = date.getDay ();
const r_today = today;
const r_month = month;
const r_year = year;
const r_weekday = weekday;
let reapYear = (year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 1 : 0);
let numOfDay = [31, 28+reapYear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

$(function () {
    $('.now').click(function () {
        location.reload();
    })

    CreateEmptyBox ($('#in-sight'));

    FillBox ($('#in-sight'));
    $('#preYear').click(function () {
        date.setFullYear(year-1);
        RenewDate ();
        AnimationLeft ();
    })
    $('#preMonth').click(function () {
        date.setMonth(month-2);
        RenewDate ();
        AnimationLeft ();
    })
    $('#nextMonth').click(function () {
        date.setMonth(month);
        RenewDate ();
        AnimationRight ();
    })
    $('#nextYear').click(function () {
        date.setYear(year+1);
        RenewDate ();
        AnimationRight ();
    })
//temp
setTimeout(() => {
    $('.ui-loader').hide();
}, 100);
})

// $box include #in-sight and #out-sight-l/r, the <table> tag
function CreateEmptyBox ($box)
{
    for (let i = 0; i < 6; ++i) {
        let $tr = $('<tr></tr>');
        $tr.addClass('week-day');
        for (let j = 0; j < 7; ++j) {
            let $td = $('<td></td>');
            $tr.append($td);
        }
        $box.append($tr);
    }
    AddSwipe ();
}

function FillBox ($box)
{
    $("#thisMonth").text((month < 10 ? '0' : '') + month);
    $("#thisYear").text(year);
    // $('.days').css({'background': `rgb(${[
    //     ((Math.random() * 1000) >> 0) % 255,
    //     ((Math.random() * 1000) >> 0) % 255,
    //     ((Math.random() * 1000) >> 0) % 255
    // ].toString()})`, 'transition': '.5s'});
    let firstWeekday = new Date(`${year}/${month}/${1}`).getDay();
    for (let d = 1; d <= numOfDay[month-1]; ++d) {
        $box.find('td')[firstWeekday+d-1].innerText = d;
        // weekend color red
        if ((firstWeekday + d - 1) % 7 == 0 || (firstWeekday + d - 1) % 7 == 6) {
            $box.find('td')[firstWeekday+d-1].className = 'weekend';
        }
        // select day
        $box.find('td')[firstWeekday+d-1].addEventListener('click', function () {
            $('.daySelected').removeClass('daySelected');
            $box.find('td')[firstWeekday+d-1].className += ' daySelected';
            daySelected = this.innerText;
            let weekday = weekChinese[new Date(`${year}/${month}/${daySelected}`).getDay()];
            let do_ = doit[(parseInt(daySelected) + year * month)%6];
            let dontdo = dontdoit[(parseInt(daySelected) + year - month)%5];
            if (window.innerWidth <= 700) { //mobile
                $('.info').html(`
                <div>
                    <div id="info-year-month"><span>${year}.${month}</span></div>
                    <div id="info-weekday"><p>星期${weekday}</p></div>
                </div>
                <div id="info-day"><span>${daySelected > 9 ? daySelected : '0' + daySelected}</span></div>
                <div>
                    <div id="doit"><p><span>宜</span>${do_}</p></div>
                    <div id="dontdoit"><p><span>忌</span>${dontdo}</p></div>
                </div>`);
            }
            else { //PC
                $('.info').html(`
                <div id="info-year-month"><span>${year}.${month}</span></div>
                <div id="info-day"><span>${daySelected > 9 ? daySelected : '0' + daySelected}</span></div>
                <div id="info-weekday"><p>星期${weekday}</p></div>
                <div id="info-yearday"><br>距离${year}年首日<br><span>${CountYearday(parseInt(daySelected))}</span> 天</div>
                <div id="doit"><p>宜</p><hr>${do_}</div>
                <div id="dontdoit"><p>忌</p><hr>${dontdo}</div>
                <div id="author">ldc37@github.com</div>`);
            }
        })
        // em real-today
        if (year == r_year && month == r_month && d == r_today) {
            $box.find('td').eq(firstWeekday+d-1).addClass('today');
            let weekday = weekChinese[new Date(`${year}/${month}/${d}`).getDay()];
            let do_ = doit[(parseInt(d) + year * month)%6];
            let dontdo = dontdoit[(parseInt(d) + year - month)%5];
            if (window.innerWidth <= 700) { //mobile
                $('.info').html(`
                <div>
                    <div id="today-flag">今日</div>
                    <div id="info-weekday"><p>星期${weekday}</p></div>
                </div>
                <div id="info-day"><span>${r_today > 9 ? r_today : '0' + r_today}</span></div>
                <div>
                    <div id="doit"><p><span>宜</span>${do_}</p></div>
                    <div id="dontdoit"><p><span>忌</span>${dontdo}</p></div>
                </div>
                `);
            }
            else { //PC
                $('.info').html(`
                <div id="info-day"><span>${r_today > 9 ? r_today : '0' + r_today}</span></div>
                <div id="today-flag">今日</div>
                <div id="info-weekday"><p>星期${weekday}</p></div>
                <div id="info-yearday"><br>距离${year}年首日<br><span>${CountYearday(parseInt(d))}</span> 天</div>
                <div id="doit"><p>宜</p><hr>${do_}</div>
                <div id="dontdoit"><p>忌</p><hr>${dontdo}</div>
                <div id="author">ldc37@github.com</div>`);
            }
        }
    }
    FillPreMonthDay ($box);
    FillNextMonthDay ($box);
}
function FillPreMonthDay ($box) 
{
    let pos = 0;
    while (1){
        if ($box.find('td')[pos].innerText != '') {
            break;
        }
        pos++;
    }
    let d = 0;
    while (--pos >= 0) {
        $box.find('td')[pos].innerText = numOfDay[month-1] - d++;
        $box.find('td')[pos].className = 'not-this-month';
    }
    $('.week-day td[class = "not-this-month"]').click(function () {
        date.setMonth(month-2);
        RenewDate ();
        AnimationLeft ();
    })
}
function FillNextMonthDay ($box)
{
    for (let i = 0, d = 1; i < 42; ++i) {
        if ($box.find('td')[i].innerText == '') {
            $box.find('td')[i].innerText = d++;
            $box.find('td')[i].className = 'not-this-month';
            $box.find('td').eq(i).click(function () {
                date.setMonth(month);
                RenewDate ();
                AnimationRight ();
            })
        }
    }
}

function RenewDate ()
{
    month = date.getMonth () + 1;
    year = date.getFullYear ();
    today = date.getDate ();
    weekday = date.getDay ();
    reapYear = (year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 1 : 0);
    numOfDay = [31, 28+reapYear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

function AnimationLeft ()
{
    $('button').attr('disabled', 'disabled'); 
    let $table = $('<table></table>');
    $table.attr('id', 'out-sight-left');
    $('.days').prepend($table);
    CreateEmptyBox($('#out-sight-left'));
    FillBox ($('#out-sight-left'));
    $('#in-sight').animate({right:'-100%'}, 500);
    $('#out-sight-left').animate({right:'0%'}, 500, () => {
        $('button').removeAttr('disabled'); 
        $('#in-sight').remove();
        $('#out-sight-left').attr('id','in-sight');
    });
}
function AnimationRight ()
{
    $('button').attr('disabled', 'disabled'); 
    let $table = $('<table></table>');
    $table.attr('id', 'out-sight-right');
    $('.days').append($table);
    CreateEmptyBox($('#out-sight-right'));
    FillBox ($('#out-sight-right'));
    $('#in-sight').animate({right:'100%'}, 500);
    $('#out-sight-right').animate({right:'0%'}, 500, () => {
        $('button').removeAttr('disabled'); 
        $('#in-sight').remove();
        $('#out-sight-right').attr('id','in-sight');
    });
}

function CountYearday (d)
{
    let sum = 0;
    for (let i = 0; i < month - 1; ++i) {
        sum += numOfDay[i];
    }
    sum += d;
    return sum;
}

function AddSwipe ()
{
    $('.days').off();
    $('.days').one('swiperight', function () {
            date.setMonth(month-2);
            RenewDate ();
            AnimationLeft ();
        })
    $('.days').one('swipeleft', function () {
        date.setMonth(month);
        RenewDate ();
        AnimationRight ();
    })
}
