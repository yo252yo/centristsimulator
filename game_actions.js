
function purchaseTech(actionId) {
    let action = document.getElementById(actionId);
    if (action.dataset.cost > good_points) {
        return; // tODO: communicate that its too expensive
    }
    good_points -= parseInt(action.dataset.cost);
    good_points_per_sec += parseInt(action.dataset.reward);
    action.style.display = "none";

    addToPortfolio(actionId + "'", action.dataset.cost * 2, action.dataset.reward * 1.5);
}

function addToPortfolio(actionId, cost, reward) {
    let li = document.createElement("li");
    li.id = actionId;
    li.textContent = `${actionId}: -${cost}$, +${reward}$/s`;
    li.dataset.cost = cost;
    li.dataset.reward = reward;

    li.addEventListener("click", function () {
        purchaseTech(actionId);
    });

    document.getElementById("portfolio").appendChild(li);
}

function addToMarketplace(actionId, cost, reward) {
    let li = document.createElement("li");
    li.id = actionId;
    li.textContent = `${actionId}: -${cost}$, +${reward}$/s`;
    li.dataset.cost = cost;
    li.dataset.reward = reward;

    li.addEventListener("click", function () {
        purchaseTech(actionId);
    });

    document.getElementById("marketplace").appendChild(li);
}

addToMarketplace("tech1", 1, 1);
addToMarketplace("tech2", 10, 10);
addToMarketplace("tech3", 10, 10);
addToMarketplace("tech4", 100, 100);
addToMarketplace("tech5", 1000, 1000);