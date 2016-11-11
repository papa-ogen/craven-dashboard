if (typeof dashboardConfig === "undefined") {

    var dbApp = document.getElementById("db-app");
    dbApp.innerHTML = '<div><strong>Error!</strong> Please add a <strong>config.js</strong> file to the project. <br /><br />' +
                      'Go to <a href="https://github.com/papa-ogen/cravenDashBoard/blob/master/README.md" target="self">DashBoard on GitHub</a> for more information and correct syntax.</div>';
    dbApp.className += " db-error";

} else {

    (function (config) {
        "use strict";

        if(config.dbcountdown === undefined) return;

        var countDownElement = document.querySelector(".db-countdown").getElementsByTagName('time')[0];
        var overlayElement = document.querySelector(".db-alert");
        var reportDay = config.dbcountdown.reportDay;
        var reportText = "";
        var d = new Date();
        var today = d.getDate();

        if(today === reportDay) {

            reportText = "Today!";
            overlayElement.classList += " db-active";

            overlayElement.addEventListener("click", function() {
                this.classList = "db-alert";
            });

        } else if (today+1 === reportDay) {
            reportText = "Towmorrow!";
        } else if (reportDay < today) {
            // if date has passed, calculate closest reportDay ahead.
            var daysInMonth = getDaysInMonth(d, d.getMonth());
            var daysLeft = (daysInMonth - today) + reportDay;

            reportText = daysLeft + " days left";
        } else {
            reportText = reportDay - today + " days left";
        }

        countDownElement.innerHTML = reportText;

        function getDaysInMonth(d, month) {
            var m = [31, (isLeapYear(d.getFullYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return m[month];
        }

        function isLeapYear(year)
        {
            return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
        }

    })(dashboardConfig);
}