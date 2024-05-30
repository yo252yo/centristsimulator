
let SPEED = 1;

let GAME_PAUSED = false;
let seconds_elapsed = 0;

// ==================================================================
// Difficulty
var difficulty_param = 0;
var match = window.location.href.match(/[?&]difficulty=(\d)/);

if (match) {
    difficulty_param = parseInt(match[1]);
}

var DIFFICULTY = 1;
if (difficulty_param == 1) { // easy
    DIFFICULTY = 0.5;
} else if (difficulty_param == 2) { // new normal
    DIFFICULTY = 2;
} else if (difficulty_param == 3) { // post new normal
    DIFFICULTY = 3;
} else if (difficulty_param == 4) { // impossible
    DIFFICULTY = 4;
    document.getElementById("carbon_capture_div").style.display = "none";
    document.getElementById("carbon_capture_div_alternative").style.display = "block";
    document.getElementById("politics_div").style.display = "block";
}

function CAN_WIN() {
    return (DIFFICULTY >= 4);
}

// ==================================================================
// Basic points
let GOOD_POINTS = Math.floor(30 / DIFFICULTY);
let GOOD_POINTS_PER_SEC = 2 / DIFFICULTY;
if (CAN_WIN()) {
    GOOD_POINTS = -5;
} else {
    document.getElementById("marketplace_div").style.maxHeight = "calc(78vh + 32px)";
    setTimeout(function () {
        pause("OFF");
    }, 250);

    // Onboarding
    document.getElementById("portfolio_div").style.visibility = "hidden";
    document.getElementById("marketplace_div").style.visibility = "hidden";
    document.getElementById("alerts_div").style.visibility = "hidden";
    document.getElementById("population_div").style.visibility = "hidden";
}

let BAD_POINTS = 0;

const BP_milestones = {
    "1": 1,
    "10": 55,
    "30": 210,
    "60": 520,
    "90": 800,
    "120": 1100,
    "150": 11000,
    "180": 55000,
    "200": 110000,
    "220": 1100000,//1m
    "240": 11000000,//10m
    "260": 110000000,//100m
    "280": 1100000000,//1b
    "300": 11000000000,//10b
}

function getBPMilestone(x) {
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

function getRawBP(seconds) {
    var bp = 0;
    if (seconds in BP_milestones) {
        bp = BP_milestones[seconds];
    } else if (seconds > 300) {
        bp = Math.floor(1.4 * Math.pow(seconds, 4.5)) - 185414561578;
    } else if (seconds >= 400) {
        if (CAN_WIN()) {
            bp = Math.floor(1.4 * Math.pow(seconds, 4.5)) - 185414561578;
        } else {
            // Let's be honest this should never happen but just in case.
            bp = 1032408931155 * Math.exp(seconds - 400);
        }
    } else {
        const milestones = getBPMilestone(seconds);
        const before = milestones.previousKey;
        const after = milestones.nextKey;
        const rate = (BP_milestones[after] - BP_milestones[before]) / (after - before);
        const interpol = BP_milestones[before] + rate * (seconds - before);
        bp = Math.floor(interpol);
    }

    return Math.floor(bp * Math.sqrt(DIFFICULTY));
}

// Smooth the curve for display purposes
function getBP(seconds) {
    if (seconds < 60) {
        return getRawBP(seconds);
    }
    return Math.floor((getRawBP(seconds - 7) + getRawBP(seconds - 5) + getRawBP(seconds) + getRawBP(seconds + 5) + getRawBP(seconds + 7)) / 5);
}

// This is the main game loop
function updatePoints() {
    // Plan the next tick
    var delay = 1000 / SPEED;
    if (DIFFICULTY == 0.5) {
        delay *= 2;
    } else if (DIFFICULTY == 2) {
        delay *= .9;
    } else if (DIFFICULTY == 3) {
        delay *= .8;
    } else if (DIFFICULTY == 4) {
        delay *= .75;
    }
    setTimeout(updatePoints, delay);

    if (GAME_PAUSED) {
        return;
    }
    seconds_elapsed++;
    GOOD_POINTS += GOOD_POINTS_PER_SEC;
    console.log(`At: ${seconds_elapsed}, ${GOOD_POINTS}$, ${GOOD_POINTS_PER_SEC}$/s`);
    BAD_POINTS = getBP(seconds_elapsed);
    PENDING_DISASTER_POINTS += Math.max(0, BAD_POINTS - GOOD_POINTS);


    if (BAD_POINTS > GOOD_POINTS) {
        if (document.getElementById("alerts_div").style.visibility == "hidden") {
            document.getElementById("alerts_div").style.visibility = "visible";
        }
        displaySuffering(BAD_POINTS - GOOD_POINTS);
    } else {
        displaySuffering(0);
    }

    // I know what i said before but i think we can let them celebrate small victories since they'll be crushed in the end
    // if (GOOD_POINTS > BAD_POINTS) { // For safety, this should never happen
    //     BAD_POINTS = GOOD_POINTS + 1;
    // }
    handleDisaster();
    drawGraphTick();
    updateHtmlValues();
    POLICIES_COOLDOWN--;
}
setTimeout(updatePoints, 1000);


function displaySuffering(suffering) {
    if (localStorage.getItem("setting_confirmation") == "true") {
        return;
    }

    const sufferintDot = document.createElement('div');
    let type = "bad";
    if (suffering == 0) {
        type = "good";
    }
    sufferintDot.innerHTML = `<span class="number_${type}">
    $${formatNumber(suffering)}=${formatNumber(suffering / pop_disaster_ratio)}deaths
    </span>`;
    sufferintDot.classList.add('suffering-dot');

    const from = document.getElementById('differencial');
    const to = document.getElementById('disaster');
    document.body.appendChild(sufferintDot);

    let fromX = from.getBoundingClientRect().left - 5;
    let fromY = from.getBoundingClientRect().top + 20;

    sufferintDot.style.left = `${Math.floor(fromX)}px`;
    sufferintDot.style.top = `${Math.floor(fromY)}px`;

    let translateX = to.getBoundingClientRect().left - from.getBoundingClientRect().left;
    let translateY = to.getBoundingClientRect().top - from.getBoundingClientRect().top;

    if (suffering == 0) {
        translateX *= -0.7;
        translateY = 30;
    } else {
        translateX *= 1.2;
        translateY *= 1.2;
    }

    sufferintDot.style.setProperty('--translate-x', `${Math.floor(translateX)}px`);
    sufferintDot.style.setProperty('--translate-y', `${Math.floor(translateY)}px`);

    setTimeout(() => {
        sufferintDot.remove();
    }, 2000);
}
// ==================================================================
// Disaster / population
let TOTAL_DISASTER_POINTS = 0;
let PENDING_DISASTER_POINTS = 0;

//let pop_rate_initial = 1000000000 / ((new Date("2024/01/01")).getTime() - (new Date("2013/01/01")).getTime());
let START_POPULATION = 8106672020;// Math.floor(8106672020 + ((new Date()).getTime() - (new Date("2024/05/02")).getTime()) * pop_rate_initial);
let start_year = 2024;
let GOAL_SECONDS = 504;


var pop_disaster_ratio = 100;
var death_alert_threshold = 1;
var disasters_before_new_compassion_lvl = -1; // the first time we need one extra popup

function current_population() {
    return Math.max(0, Math.ceil(START_POPULATION - TOTAL_DISASTER_POINTS / pop_disaster_ratio));
}

function disaster_progress() { // in [0,1]
    return Math.min(1, PENDING_DISASTER_POINTS / (death_alert_threshold * pop_disaster_ratio));
}

function dismissDisaster() {
    TOTAL_DISASTER_POINTS = TOTAL_DISASTER_POINTS + PENDING_DISASTER_POINTS;
    console.log(`Disaster: ${PENDING_DISASTER_POINTS} -> ${TOTAL_DISASTER_POINTS}`);
    PENDING_DISASTER_POINTS = 0;

    displayPopulation();
}

var death_alert_thresholds = [1, 2, 5, 10, 100, 1000, 100000, 1000000, 100000000, 1000000000];
function changeCompassionSlider() {
    var index = parseInt(document.getElementById("compassion_slider").value);
    death_alert_threshold = death_alert_thresholds[index];
    document.getElementById("compassion_fade").innerText = formatNumber(death_alert_threshold);
    disasters_before_new_compassion_lvl = 0;
    displayPopulation();
}

if (localStorage.getItem("compassionMax")) {
    document.getElementById("compassion_slider").max = parseInt(localStorage.getItem("compassionMax"));
    document.getElementById("compassion_slider").disabled = false;
}

function handleDisaster() {
    if (PENDING_DISASTER_POINTS > pop_disaster_ratio * death_alert_threshold) {
        var victims = Math.floor(PENDING_DISASTER_POINTS / pop_disaster_ratio);

        if (document.getElementById("population_div").style.visibility == "hidden") {
            document.getElementById("population_div").style.visibility = "visible";
        }

        if (victims < 10) {
            sfx("Disaster_tiny");
        } else if (victims < 1000) {
            sfx("Disaster_small");
        } else {
            sfx("Disaster_huge");
        }

        disasters_before_new_compassion_lvl++;
        if (disasters_before_new_compassion_lvl == 2) {
            var maxSlider = Math.min(death_alert_thresholds.length - 1, 1 + parseInt(document.getElementById("compassion_slider").max));
            localStorage.setItem("compassionMax", maxSlider);
            document.getElementById("compassion_slider").max = maxSlider;
            document.getElementById("compassion_slider").disabled = false;
            document.getElementById("compassion_slider_disclaimer").style.display = "block";
        }

        document.getElementById("death_report").innerHTML = `
        ${victims} people died in horrible circumstances.        
        `;

        if (localStorage.getItem("setting_normalization") != "true") {
            pause("OFF");
            displayPopup();
        } else {
            dismissDisaster();
        }
        displayPopulation();
    }

    if (current_population() <= 0) {
        lose();
    } else if (CAN_WIN() && seconds_elapsed > GOAL_SECONDS) {
        win();
    }
}



// ==================================================================
// Graph
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const maxXGraph = 500;
const maxYGraph = 3000000000000;
const minYGraph = 10;
const marginGraph = 10;

function graphY(points) {
    if (points < 5) {
        return canvas.height - marginGraph;
    }
    const value = Math.max(1, Math.log(points) - Math.log(minYGraph));
    return canvas.height - marginGraph - (value / (Math.log(maxYGraph) - Math.log(minYGraph)) * (canvas.height - 2 * marginGraph));
}

function graphX(seconds) {
    var linearZone = 175;
    var linearZone_time = 200;

    if (seconds < linearZone_time) {
        return marginGraph + (seconds / linearZone_time) * linearZone;
    } else {
        return marginGraph + linearZone + (Math.log(seconds) - Math.log(linearZone_time)) / (Math.log(maxXGraph) - Math.log(linearZone_time)) * (canvas.width - 2 * marginGraph - linearZone);
    }
}

function drawLine(fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
}

function drawAxes() {
    ctx.strokeStyle = '#bffdfb';
    ctx.fillStyle = '#bffdfb';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // X axis
    drawLine(marginGraph, canvas.height - marginGraph, canvas.width - marginGraph, canvas.height - marginGraph);
    for (var label = 60; label < maxXGraph; label += 60) {
        drawLine(graphX(label), canvas.height - 1.5 * marginGraph, graphX(label), canvas.height - 0.5 * marginGraph);
    }

    // Y axis
    drawLine(marginGraph, marginGraph, marginGraph, canvas.height - marginGraph);
    for (var label = minYGraph; label < maxYGraph; label *= 10) {
        drawLine(0.5 * marginGraph, graphY(label), 1.5 * marginGraph, graphY(label));
    }
}

let initialLimit = localStorage.getItem("highest_reached_point") || 0;
var previousPoints = {};
function drawPoint(time, rawY, color, thick) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    const x = graphX(time);
    const y = graphY(rawY);

    if (previousPoints[color] != undefined) {
        drawLine(graphX(time) - 1, previousPoints[color], x, y);
    }
    ctx.beginPath();
    ctx.arc(x, y, thick || 1, 0, 2 * Math.PI);
    ctx.fill();
    previousPoints[color] = y;
    localStorage.setItem("highest_reached_point", Math.max(time, initialLimit));
}

drawAxes();
function drawGraphTick() {
    drawPoint(seconds_elapsed, GOOD_POINTS, '#45cb8b');

    if (localStorage.getItem("setting_confirmation") != "true") {
        drawPoint(seconds_elapsed, BAD_POINTS, '#fb4447');
    }
}

if (localStorage.getItem("setting_confirmation") != "true") {
    for (var i = 0; i <= initialLimit; i++) {
        drawPoint(i, getBP(i), '#fb444703', 6);
    }
}
