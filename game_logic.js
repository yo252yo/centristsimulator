
let GAME_PAUSED = false;

let good_points = 10;
let good_points_per_year = 1;

let bad_points = 0;

let year = 0;
let ms_in_year = 3000;

let difficulty = 1;


let pop_rate_initial = 1000000000 / ((new Date("2024/01/01")).getTime() - (new Date("2013/01/01")).getTime());
let pop = Math.floor(8106672020 + ((new Date()).getTime() - (new Date("2024/05/02")).getTime()) * pop_rate_initial);


function updatePointsYearly() {
    if (GAME_PAUSED) {
        return;
    }
    year++;
    good_points += good_points_per_year;
    bad_points = Math.floor(difficulty * Math.pow(year, 4));
    pop += good_points - bad_points;

    if (pop <= 0) {
        alert("LOST");
        location.href = "difficulty.html";
    }
}
setInterval(updatePointsYearly, ms_in_year);
