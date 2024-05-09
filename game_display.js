
let start_year = (new Date()).getFullYear();

function formatNumber(number) {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'B';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else if ((number * 10) % 10 != 0) {
        return number.toFixed(1).toString();
    } else {
        return number.toString();
    }
}

function updateAllPurchases() {
    var listItems = document.querySelectorAll('li');
    listItems.forEach(function (li) {
        var cost = parseFloat(li.dataset.cost);

        if (good_points >= cost) {
            li.style.opacity = 1;
        } else {
            li.style.opacity = 0.2;
        }
    });
}

function updateTime() {
    var year = start_year + Math.floor(seconds_elapsed / 4);
    var season = seconds_elapsed % 4;
    document.getElementById("date").innerHTML = `Year: ${year} ${"|".repeat(season)}${".".repeat(4 - season)}`;
}

function updatePoints() {
    document.getElementById("s_points").innerHTML = formatNumber(good_points);
    document.getElementById("s_income").innerHTML = formatNumber(good_points_per_sec);
    document.getElementById("c_points").innerHTML = formatNumber(bad_points);
    document.getElementById("differencial").innerHTML = formatNumber(bad_points - good_points);
}

function updatePopulation() {
    document.getElementById("population").innerHTML = `${population}`;
    var disaster_chars = 20;
    var decimals = MOCK_disaster - Math.floor(MOCK_disaster);
    var interval = 1 / disaster_chars;
    var progress = Math.round(decimals / interval);
    document.getElementById("disaster").innerHTML = "|".repeat(progress) + ".".repeat(disaster_chars - progress);
}

function updateHtmlValues() {
    updateTime();
    updatePoints();
    updatePopulation();
    updateAllPurchases();
}
updateHtmlValues();
setInterval(updateHtmlValues, 500);

function pause() {
    GAME_PAUSED = !GAME_PAUSED;
    document.getElementById("pause").innerHTML = GAME_PAUSED ? ">>" : "||";
}