

let start_year = (new Date()).getFullYear();
let start_ts = (new Date()).getTime();

let s_points = 10;
let s_points_per_year = 1;

let c_points = 0;

let year = 0;
let ms_in_year = 3000;

let difficulty = 1;


let pop_rate_initial = 1000000000 / ((new Date("2024/01/01")).getTime() - (new Date("2013/01/01")).getTime());
let pop = Math.floor(8106672020 + ((new Date()).getTime() - (new Date("2024/05/02")).getTime()) * pop_rate_initial);



function updateHtml() {
    document.getElementById("date").innerHTML = `Year: ${start_year + year} (1yr = ${ms_in_year / 1000}s)`;
    document.getElementById("s_points").innerHTML = `Sustainability points: ${s_points}$, ${s_points_per_year}$/yr  `;
    document.getElementById("c_points").innerHTML = `Crisis points: ${c_points}`;

    document.getElementById("differencial").innerHTML = `Differential: ${s_points - c_points}`;
    document.getElementById("population").innerHTML = `Population: ${pop}`;

}
setInterval(updateHtml, 500);



function updateValues() {
    if (paused) {
        return;
    }
    year++;
    s_points += s_points_per_year;
    c_points = Math.floor(difficulty * Math.pow(year, 4));
    pop += s_points - c_points;

    if (pop <= 0) {
        alert("LOST");
        location.href = "difficulty.html";
    }
}
setInterval(updateValues, ms_in_year);

let paused = false;
function pause() {
    paused = !paused;
    document.getElementById("pause").innerHTML = paused ? ">>" : "||";
}



function choseAction(actionId) {
    let action = document.getElementById(actionId);
    if (action.dataset.cost > s_points) {
        return; // tODO: communicate that its too expensive
    }
    s_points -= parseInt(action.dataset.cost);
    s_points_per_year += parseInt(action.dataset.reward);
    action.style.display = "none";

    addActionToList(actionId + "'", action.dataset.cost * 2, action.dataset.reward * 1.5);
}

function addActionToList(actionId, cost, reward) {
    let li = document.createElement("li");
    li.id = actionId;
    li.textContent = `${actionId}: -${cost}$, +${reward}$/s`;
    li.dataset.cost = cost;
    li.dataset.reward = reward;

    li.addEventListener("click", function () {
        choseAction(actionId);
    });

    document.getElementById("actions").appendChild(li);
}

addActionToList("action1", 1, 1);
addActionToList("action2", 10, 10);
addActionToList("action3", 10, 10);
addActionToList("action4", 100, 100);
addActionToList("action5", 1000, 1000);