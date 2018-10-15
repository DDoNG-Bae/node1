function dateParse(time) {
    var MinMilli = 1000 * 60;
    var HrMilli = MinMilli * 60;
    var DyMilli = HrMilli * 24;

    var date = new Date(time);
    var now = new Date();
    var between = (now - date) / DyMilli;

    if (between < 1) {
        return Math.floor((now - date) / HrMilli) + '시간전';
    }
    else {
        return date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate();
    }
}