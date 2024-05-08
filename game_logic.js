
let GAME_PAUSED = false;

let good_points = 10;
let good_points_per_sec = 1;

let bad_points = 0;

let seconds_elapsed = 0;

let difficulty = 1;

let pop_rate_initial = 1000000000 / ((new Date("2024/01/01")).getTime() - (new Date("2013/01/01")).getTime());
let population = Math.floor(8106672020 + ((new Date()).getTime() - (new Date("2024/05/02")).getTime()) * pop_rate_initial);


let MOCK_disaster = 0;

function updatePoints() {
    if (GAME_PAUSED) {
        return;
    }
    seconds_elapsed++;
    good_points += good_points_per_sec;
    bad_points = Math.floor(difficulty * Math.pow(seconds_elapsed, 4));
    population += good_points - bad_points;
    MOCK_disaster += Math.random() * 0.4;

    if (population <= 0) {
        alert("LOST");
        location.href = "difficulty.html";
    }
}
setInterval(updatePoints, 1000);
