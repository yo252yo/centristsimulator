
let SPEED = 1;

let GAME_PAUSED = false;

let GOOD_POINTS = 10;
let GOOD_POINTS_PER_SEC = 2;

let BAD_POINTS = 0;

let seconds_elapsed = 0;

let difficulty = 1;

let TOTAL_DISASTER_POINTS = 0;

let pop_rate_initial = 1000000000 / ((new Date("2024/01/01")).getTime() - (new Date("2013/01/01")).getTime());
let START_POPULATION = Math.floor(8106672020 + ((new Date()).getTime() - (new Date("2024/05/02")).getTime()) * pop_rate_initial);

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
    // Plan the next tick
    setTimeout(updatePoints, 1000 / SPEED);

    if (GAME_PAUSED) {
        return;
    }
    seconds_elapsed++;
    GOOD_POINTS += GOOD_POINTS_PER_SEC;
    console.log(`At: ${seconds_elapsed}, ${GOOD_POINTS}$, ${GOOD_POINTS_PER_SEC}$/s`);
    BAD_POINTS = getBP(seconds_elapsed);

    // I know what i said before but i think we can let them celebrate small victories since they'll be crushed in the end
    // if (GOOD_POINTS > BAD_POINTS) { // For safety, this should never happen
    //     BAD_POINTS = GOOD_POINTS + 1;
    // }

    TOTAL_DISASTER_POINTS += Math.max(0, BAD_POINTS - GOOD_POINTS);

    // if (population <= 0) {
    //     alert("LOST");
    //     location.href = "difficulty.html";
    // }
}
setTimeout(updatePoints, 1000);
