
function choseAction(actionId) {
    let action = document.getElementById(actionId);
    if (action.dataset.cost > good_points) {
        return; // tODO: communicate that its too expensive
    }
    good_points -= parseInt(action.dataset.cost);
    good_points_per_sec += parseInt(action.dataset.reward);
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