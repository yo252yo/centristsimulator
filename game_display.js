
let start_year = (new Date()).getFullYear();


function displayAllPurchases() {
    var listItems = document.querySelectorAll('li');
    listItems.forEach(function (li) {
        var cost = parseFloat(li.dataset.cost);
        if (li.dataset.is_market) {
            cost += LICENSING_FEE;

            if (GOOD_POINTS_PER_SEC * 100 < cost) {
                li.style.display = "none";
            } else {
                li.style.display = "block";
            }
        }

        if (GOOD_POINTS >= cost) {
            li.style.opacity = 1;
        } else {
            li.style.opacity = 0.2;
        }
    });
}

function displayTime() {
    var year = start_year + Math.floor(seconds_elapsed / 4);
    var season = seconds_elapsed % 4;
    document.getElementById("date").innerHTML = `Year: ${year} ${"|".repeat(season)}${".".repeat(4 - season)}`;
}

function displayPoints() {
    document.getElementById("s_points").innerHTML = formatNumber(GOOD_POINTS);
    document.getElementById("s_income").innerHTML = formatNumber(GOOD_POINTS_PER_SEC);
    document.getElementById("c_points").innerHTML = formatNumber(BAD_POINTS);
    var d = Math.max(0, BAD_POINTS - GOOD_POINTS);
    document.getElementById("differencial").innerHTML = formatNumber(d);

    document.getElementById("licensing_fee").innerHTML = formatNumber(LICENSING_FEE);
}

function displayPopulation() {
    document.getElementById("population").innerHTML = `${population}`;
    var disaster_chars = 20;
    var decimals = MOCK_disaster - Math.floor(MOCK_disaster);
    var interval = 1 / disaster_chars;
    var progress = Math.round(decimals / interval);
    document.getElementById("disaster").innerHTML = "|".repeat(progress) + ".".repeat(disaster_chars - progress);
}

function updateHtmlValues() {
    displayTime();
    displayPoints();
    displayPopulation();
    displayAllPurchases();
}
updateHtmlValues();
setInterval(updateHtmlValues, 500);



function clicker() {
    if (GAME_PAUSED) {
        return;
    }

    GOOD_POINTS += Math.min(1, SPEED);
    displayPoints();
}



function pause() {
    GAME_PAUSED = !GAME_PAUSED;
    document.getElementById("pause").innerHTML = GAME_PAUSED ? ">>" : "||";
}

function speed(set_at) {
    if (!set_at) {
        SPEED *= 2;
        if (SPEED > 8) {
            SPEED = .5;
        }
    } else if (set_at == "+") {
        if (SPEED < 8) {
            SPEED *= 2;
        }
    } else if (set_at == "-") {
        SPEED = Math.max(.5, SPEED / 2);
    } else {
        SPEED = set_at;
    }
    document.getElementById("speed").innerHTML = `x${SPEED}`;
}

function handleKeyPress(event) {
    if (event.key === ' ' || event.key === '0' || event.key === 'Enter' || event.key === 'Return') {
        pause();
    }
    if (event.key === '1') {
        speed(1);
    }
    if (event.key === '2') {
        speed(2);
    }
    if (event.key === '3') {
        speed(4);
    }
    if (event.key === '4') {
        speed(8);
    }
    if (event.key === '+') {
        speed("+");
    }
    if (event.key === '-') {
        speed("-");
    }
}
document.addEventListener('keypress', handleKeyPress);
