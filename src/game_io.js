
// ==================================================================
// HTML display

function displayAllPurchases() {
    var listItems = document.querySelectorAll('li');
    listItems.forEach(function (li) {
        var cost = parseFloat(li.dataset.cost);
        if (li.dataset.is_market) {
            cost += LICENSING_FEE;

            if (GOOD_POINTS_PER_SEC * 100 >= cost) {
                li.style.display = "block";
            }
        }

        if (GOOD_POINTS >= cost) {
            li.style.opacity = 1;
        } else if (li.dataset.is_market) {
            li.style.opacity = 0.2;
        } else {
            li.style.opacity = 0.4;
        }

        if (li.dataset.is_policy) {
            if (POLICIES_COOLDOWN <= 0) {
                li.style.opacity = 1.0;
            } else {
                li.style.opacity = 0.2;
            }
        }
    });
}

function displayTime() {
    var year = start_year + Math.floor(seconds_elapsed / 4);
    var season = seconds_elapsed % 4;
    document.getElementById("date").innerHTML = `Year: ${year} ${"|".repeat(season)}${".".repeat(4 - season)}`;

    var gauge_characters = 30;
    var interval = 1 / gauge_characters;
    var progress = Math.round((seconds_elapsed / GOAL_SECONDS) / interval);
    if (!CAN_WIN()) {
        // Let's be honest this should never happen but just in case.
        progress = Math.min(progress, gauge_characters - 1);
    }
    document.getElementById("timer").innerHTML = "|".repeat(progress) + ".".repeat(gauge_characters - progress);
}

function displayPoints() {
    document.getElementById("s_points").innerHTML = formatNumber(GOOD_POINTS);
    document.getElementById("s_income").innerHTML = formatNumber(GOOD_POINTS_PER_SEC);
    document.getElementById("c_points").innerHTML = formatNumber(BAD_POINTS);
    var d = Math.max(0, BAD_POINTS - GOOD_POINTS);
    document.getElementById("differencial").innerHTML = formatNumber(d);
    if (d > 0) {
        document.getElementById("differencial").classList.add("number_bad");
        document.getElementById("differencial").classList.remove("number_good");
    } else {
        document.getElementById("differencial").classList.remove("number_bad");
        document.getElementById("differencial").classList.add("number_good");
    }

    document.getElementById("licensing_fee").innerHTML = formatNumber(LICENSING_FEE);

    var policies = document.getElementsByClassName("policyCost");
    for (var p of policies) {
        p.innerHTML = formatNumber(GOOD_POINTS_PER_SEC / 2);
    }
}

function displayPopulation() {
    var decimals = disaster_progress();

    var gauge_characters = 20;
    var interval = 1 / gauge_characters;
    var progress = Math.round(decimals / interval);
    document.getElementById("disaster").innerHTML = "|".repeat(progress) + ".".repeat(gauge_characters - progress);

    document.getElementById("population").innerHTML = `${current_population()}`;
}

function displayPoliticsCooldown() {
    var gauge_characters = 30;
    var interval = 1 / gauge_characters;
    var progress = Math.round((1 - POLICIES_COOLDOWN / POLICIES_COOLDOWN_MAX) / interval);

    if (POLICIES_COOLDOWN <= 0) {
        document.getElementById("politics_cooldown").innerHTML = ``;
    } else {
        document.getElementById("politics_cooldown").innerHTML = `
            <br />COOLDOWN: 
            ${"|".repeat(progress)}${".".repeat(gauge_characters - progress)}
        `;
    }

}

function updateHtmlValues() {
    displayTime();
    displayPoints();
    displayPopulation();
    displayAllPurchases();
    displayPoliticsCooldown();
}
updateHtmlValues();


// ==================================================================
// Interactions

function clicker() {
    if (GAME_PAUSED) {
        return;
    }

    GOOD_POINTS += Math.min(1, SPEED);
    displayPoints();
}

function dismissPopup() {
    document.getElementById("popup").style.visibility = "hidden";
    dismissDisaster();
}

function displayPopup() {
    document.getElementById("popup").style.visibility = "visible";
}

function pause(forced_state) {
    if (GAME_OVER) {
        return;
    }
    if (forced_state) {
        if (forced_state == "ON") {
            GAME_PAUSED = false;
        }
        if (forced_state == "OFF") {
            GAME_PAUSED = true;
        }
    } else {
        GAME_PAUSED = !GAME_PAUSED;
    }
    if (!GAME_PAUSED) {
        if (document.getElementById("popup").style.visibility != "hidden") {
            dismissPopup();
        }
    }
    document.getElementById("pause").innerHTML = GAME_PAUSED ? "UNPAUSE" : "PAUSE";
    if (GAME_PAUSED) {
        document.body.classList.add('background_paused');
        document.body.classList.remove('background');
    } else {
        document.body.classList.add('background');
        document.body.classList.remove('background_paused');
    }
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


// ==================================================================
// Ending
var GAME_OVER = false;

function win() {
    pause("OFF");
    GAME_OVER = true;
    document.getElementById("popup_win").style.visibility = "visible";
}

function lose() {
    pause("OFF");
    GAME_OVER = true;
    document.getElementById("popup_lose").style.visibility = "visible";
}

// ==================================================================
// Options

if (localStorage.getItem("setting_confirmation") == "true") {
    for (var e of document.getElementsByClassName("hide_confirmation")) {
        e.style.display = "none";
    }
}
if (localStorage.getItem("setting_normalization") == "true") {
    for (var e of document.getElementsByClassName("hide_normalization")) {
        e.style.display = "none";
    }
}


// ==================================================================
// Keyboard

function handleKeyPress(event) {

    if (event.target.tagName.toLowerCase() === 'input' && event.target.type.toLowerCase() === 'text') {
        return; // If it's an input, don't capture the event
    }

    if (event.key === ' ' || event.key === '0' || event.key === 'Enter' || event.key === 'Return') {
        if (document.getElementById("popup").style.visibility != "hidden") {
            dismissPopup();
        } else {
            pause();
        }
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

    event.stopPropagation();
    event.preventDefault();
}
document.addEventListener('keypress', handleKeyPress);
