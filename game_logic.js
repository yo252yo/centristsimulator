
let GAME_PAUSED = false;

let good_points = 10;
let good_points_per_sec = 1;

let BP = 0;

let seconds_elapsed = 0;

let difficulty = 1;

let pop_rate_initial = 1000000000 / ((new Date("2024/01/01")).getTime() - (new Date("2013/01/01")).getTime());
let population = Math.floor(8106672020 + ((new Date()).getTime() - (new Date("2024/05/02")).getTime()) * pop_rate_initial);


let MOCK_disaster = 0;

const BP_milestones = {
    "1": 1,
    "10": 55,
    "30": 210,
    "60": 520,
    "90": 800,
    "120": 1100,
    "150": 11000,
    "180": 55000,
    "210": 110000,
    "240": 1100000,
    "270": 11000000,
    "300": 11000000000,
}

function getMilestone(x) {
    let previousKey, nextKey = null;
    for (let key in BP_milestones) {
        if (key <= x) {
            previousKey = key;
        } else {
            nextKey = key;
            break;
        }
    }
    return { previousKey, nextKey };
}

function getBP(seconds) {
    if (seconds in BP_milestones) {
        return BP_milestones[seconds];
    } else if (seconds > 300) {
        return Math.floor(1.4 * Math.pow(seconds, 4));
    } else {
        const milestones = getMilestone(seconds);
        const before = milestones.previousKey;
        const after = milestones.nextKey;
        const rate = (BP_milestones[after] - BP_milestones[before]) / (after - before);
        const interpol = BP_milestones[before] + rate * (seconds - before);
        return Math.floor(interpol);
    }
}

function updatePoints() {
    if (GAME_PAUSED) {
        return;
    }
    seconds_elapsed++;
    good_points += good_points_per_sec;
    BP = getBP(seconds_elapsed);
    population += good_points - BP;
    MOCK_disaster += Math.random() * 0.4;

    if (population <= 0) {
        alert("LOST");
        location.href = "difficulty.html";
    }
}
setInterval(updatePoints, 1000);
