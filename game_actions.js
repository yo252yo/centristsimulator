
let LF_index = 0;
let LF_table = [1, 5, 10, 100, 1000, 50000, 1000000, 1000000000];
let LICENSING_FEE = LF_table[LF_index];

function update_license_fee() {
    if (LF_index < LF_table.length - 1) {
        LF_index++;
        LICENSING_FEE = LF_table[LF_index];
    } else {
        LICENSING_FEE *= LICENSING_FEE;
    }
}

function purchaseTech(actionId) {
    let action = document.getElementById(actionId);
    if (action.dataset.cost > GOOD_POINTS) {
        return;
    }
    GOOD_POINTS -= parseInt(action.dataset.cost);
    GOOD_POINTS_PER_SEC += parseInt(action.dataset.reward);
    action.style.display = "none";

    update_license_fee();
    addToPortfolio(actionId + "'", action.dataset.cost * 2, action.dataset.reward * 1.5);
    updateHtmlValues();
}

function upgradeTech(actionId) {
    let action = document.getElementById(actionId);
    if (action.dataset.cost > GOOD_POINTS) {
        return;
    }
    GOOD_POINTS -= parseInt(action.dataset.cost);
    GOOD_POINTS_PER_SEC += parseInt(action.dataset.reward);
    action.style.display = "none";

    addToPortfolio(actionId + "'", action.dataset.cost * 2, action.dataset.reward * 1.5);
    updateHtmlValues();
}

function addToPortfolio(actionId, cost, reward) {
    let li = document.createElement("li");
    li.id = actionId;
    li.textContent = `${actionId}: -${formatNumber(cost)}$, +${formatNumber(reward)}$/s`;
    li.dataset.cost = cost;
    li.dataset.reward = reward;

    li.addEventListener("click", function () {
        upgradeTech(actionId);
    });

    document.getElementById("portfolio").appendChild(li);
}

function addToMarketplace(actionId, cost, reward) {
    let li = document.createElement("li");
    li.id = actionId;
    li.textContent = `${actionId}: -${formatNumber(cost)}$, +${formatNumber(reward)}$/s`;
    li.dataset.cost = cost;
    li.dataset.reward = reward;
    li.dataset.is_market = true;

    li.addEventListener("click", function () {
        purchaseTech(actionId);
    });

    document.getElementById("marketplace").appendChild(li);
}

addToMarketplace("tech1", 1, 1);
addToMarketplace("tech1", 2, 1);
addToMarketplace("tech2", 5, 5);
addToMarketplace("tech3", 10, 10);
addToMarketplace("tech4", 10, 10);
addToMarketplace("tech4", 20, 20);
addToMarketplace("tech5", 50, 50);
addToMarketplace("tech5", 100, 100);
addToMarketplace("tech6", 200, 200);
addToMarketplace("tech6", 500, 200);
addToMarketplace("tech7", 1000, 1000);
addToMarketplace("tech7", 2000, 1000);
addToMarketplace("tech7", 5000, 1000);
addToMarketplace("tech8", 10000, 10000);
addToMarketplace("tech8", 20000, 10000);
addToMarketplace("tech8", 50000, 10000);
addToMarketplace("tech9", 100000, 100000);
addToMarketplace("tech9", 200000, 100000);
addToMarketplace("tech9", 500000, 100000);
addToMarketplace("tech10", 1000000, 1000000);
addToMarketplace("tech10", 2000000, 1000000);
addToMarketplace("tech10", 5000000, 1000000);
addToMarketplace("tech11", 10000000, 1000000);
addToMarketplace("tech11", 20000000, 1000000);
addToMarketplace("tech11", 50000000, 1000000);
addToMarketplace("tech12", 100000000, 10000000); //100m