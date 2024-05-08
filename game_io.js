
let start_year = (new Date()).getFullYear();

function updateHtmlValues() {
    document.getElementById("date").innerHTML = `Year: ${start_year + year} (1yr = ${ms_in_year / 1000}s)`;

    document.getElementById("s_points").innerHTML = good_points;
    document.getElementById("s_income").innerHTML = good_points_per_year;
    document.getElementById("c_points").innerHTML = bad_points;
    document.getElementById("differencial").innerHTML = bad_points - good_points;

    document.getElementById("population").innerHTML = `${pop}`;
    document.getElementById("disaster").innerHTML = `..............`;
}
setInterval(updateHtmlValues, 500);


function pause() {
    GAME_PAUSED = !GAME_PAUSED;
    document.getElementById("pause").innerHTML = GAME_PAUSED ? ">>" : "||";
}