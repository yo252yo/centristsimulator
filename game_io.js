
let start_year = (new Date()).getFullYear();

function formatNumber(number) {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'B';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
}

function updateHtmlValues() {
    var year = start_year + Math.floor(seconds_elapsed / 4);
    var season = seconds_elapsed % 4;
    document.getElementById("date").innerHTML = `Year: ${year} ${"|".repeat(season)}${".".repeat(4 - season)}`;

    document.getElementById("s_points").innerHTML = formatNumber(good_points);
    document.getElementById("s_income").innerHTML = formatNumber(good_points_per_sec);
    document.getElementById("c_points").innerHTML = formatNumber(BP);
    document.getElementById("differencial").innerHTML = formatNumber(BP - good_points);

    document.getElementById("population").innerHTML = `${population}`;


    var disaster_chars = 20;
    var decimals = MOCK_disaster - Math.floor(MOCK_disaster);
    var interval = 1 / disaster_chars;
    var progress = Math.round(decimals / interval);
    document.getElementById("disaster").innerHTML = "|".repeat(progress) + ".".repeat(disaster_chars - progress);
}
setInterval(updateHtmlValues, 500);


function pause() {
    GAME_PAUSED = !GAME_PAUSED;
    document.getElementById("pause").innerHTML = GAME_PAUSED ? ">>" : "||";
}