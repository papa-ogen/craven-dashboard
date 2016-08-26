(function() {

    var element = document.getElementsByClassName("countdown-text");
    var d = new Date();
    var targetDate = new Date("2016-09-21");
    var dif = targetDate.getTime() - d.getTime();
    var today = parseInt(dif / (1000*60*60*24));

    element[0].innerHTML = today;

})();