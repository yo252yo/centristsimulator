
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
    document.getElementById("date").innerHTML = `Year: ${year} <span class='loading_bar'>${"|".repeat(season)}${".".repeat(3 - season)}</span>`;

    var gauge_characters = 15;
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
    document.getElementById("disaster").innerHTML = `<span class="number_bad">` + "|".repeat(progress) + "</span>" + ".".repeat(gauge_characters - progress);

    for (var e of document.getElementsByClassName("compassion_fade_100")) {
        e.innerHTML = `<span class="number_bad">` + formatNumber(PENDING_DISASTER_POINTS) + "</span>/" + formatNumber(death_alert_threshold * pop_disaster_ratio);
    }

    if (!current_population()) {
        document.getElementById("population").innerHTML = '0';
        return;
    }

    var pendingDeath = Math.ceil(PENDING_DISASTER_POINTS / pop_disaster_ratio);
    var display = `${current_population()}`;
    var i = 0;
    while (pendingDeath > 0) {
        pendingDeath = Math.round(pendingDeath / 10);
        i++;
    }
    if (i > 0) {
        display = display.substr(0, display.length - i - 1) + '?'.repeat(i + 1);
    }
    document.getElementById("population").innerHTML = display;
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
            <span class="loading_bar">${"|".repeat(progress)}${".".repeat(gauge_characters - progress)}</span>
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
        pause("ON");
    }
    if (document.getElementById("marketplace_div").style.visibility == "hidden") {
        document.getElementById("marketplace_div").style.visibility = "visible";
    }

    sfx("Clicker");
    GOOD_POINTS += Math.min(1, SPEED);
    displayPoints();
    document.getElementById("carbon_capture_button").blur();
    createCarbonDot();
}

function createCarbonDot() {
    const carbonDot = document.createElement('div');
    carbonDot.innerText = "$1";
    carbonDot.classList.add('carbon-dot');

    const button = document.getElementById('carbon_capture_button');
    button.parentElement.appendChild(carbonDot);

    const xPos = button.getBoundingClientRect().left + 40 * Math.random();
    const yPos = button.getBoundingClientRect().top + 50 * Math.random();

    carbonDot.style.left = `${Math.floor(xPos)}px`;
    carbonDot.style.top = `${Math.floor(yPos)}px`;

    const translateX = -100 - Math.floor(Math.random() * 50);
    const translateY = Math.floor(Math.random() * 300 - 50);

    carbonDot.style.setProperty('--translate-x', `${translateX}px`);
    carbonDot.style.setProperty('--translate-y', `${translateY}px`);

    setTimeout(() => {
        carbonDot.remove();
    }, 3000);
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

    linkSfx();
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
        document.getElementById("screenfilter").classList.add('screenfilter_paused');
        document.getElementById("screenfilter").classList.add('screenflicker_paused');
        document.getElementById("screenfilter").classList.remove('screenfilter_unpaused');
        document.getElementById("screenfilter").classList.remove('screenflicker_unpaused');
        document.documentElement.style.setProperty('--ui-color', '#858e8d99');
        document.documentElement.style.setProperty('--ui-color-transparent', '#d5dedd66');
        document.documentElement.style.setProperty('--ui-color-dark', '#d5dedd66');
        document.getElementById('graphCanvas').style.opacity = 0.5;
    } else {
        document.getElementById("screenfilter").classList.add('screenfilter_unpaused');
        document.getElementById("screenfilter").classList.add('screenflicker_unpaused');
        document.getElementById("screenfilter").classList.remove('screenfilter_paused');
        document.getElementById("screenfilter").classList.remove('screenflicker_paused');
        document.documentElement.style.setProperty('--ui-color', '#bffdfb');
        document.documentElement.style.setProperty('--ui-color-transparent', '#bffdfbdd');
        document.documentElement.style.setProperty('--ui-color-dark', '#bffdfb22');
        document.getElementById('graphCanvas').style.opacity = 1;
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
    linkSfx();
}

function collapse_section(event) {
    const content = event.target.nextElementSibling;
    if (content.style.display == 'none') {
        content.style.display = 'block';
        event.target.textContent = event.target.textContent.substring(3);
    } else {
        content.style.display = 'none';
        event.target.textContent = ">> " + event.target.textContent;
    }
}

// ==================================================================
// Ending
var GAME_OVER = false;

function win() {
    pause("OFF");
    GAME_OVER = true;
    document.getElementById("popup_win").style.visibility = "visible";
    sfx("Victory");
    if (TOTAL_DISASTER_POINTS == 0) {
        document.getElementById("no_death").style.display = "block";
        gtag('event', 'game_perfect', {
            'event_category': 'Game',
            'event_label': 'Perfect'
        });
    }
    gtag('event', 'game_win', {
        'event_category': 'Game',
        'event_label': 'Win'
    });
}

function lose() {
    pause("OFF");
    GAME_OVER = true;
    document.getElementById("popup_lose").style.visibility = "visible";
    sfx("Defeat");
    gtag('event', 'game_lose', {
        'event_category': 'Game',
        'event_label': 'Lose'
    });
    gtag('event', 'defeat_timer', {
        'event_category': 'Game',
        'event_label': 'DefeatTimer',
        'value': seconds_elapsed
    });
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
        if (event.key == 'Enter' && event.target.id == "policy_input") {
            purchasePolicy(joker_policy);
            event.target.blur();
        }
        return; // If it's an input, don't capture the event
    }

    if (event.key === ' ' || event.key === '0' || event.key === 'Enter' || event.key === 'Return') {
        if (document.getElementById("popup").style.visibility == "visible") {
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


document.addEventListener("click", function (event) {
    if (['a', 'input', 'span', 'li', 'h3'].includes(event.target.tagName.toLowerCase())) {
        return;
    }
    if (GAME_PAUSED) {
        if (document.getElementById("popup").style.visibility == "visible") {
            dismissPopup();
        } else {
            pause("ON");
        }
    } else {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobileDevice) {
            pause();
        }
    }
});

document.addEventListener('wheel', (event) => {
    if (event.ctrlKey) {
        return;
    }

    var element = event.target;
    while (element) {
        if (element.scrollHeight - element.scrollTop != element.clientHeight) {
            return;
        }
        element = element.parentElement;
    }
    event.preventDefault();
}, { passive: false });
