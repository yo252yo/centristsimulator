
let LF_index = 0;
let LF_table = [1, 5, 10, 100, 1000, 50000, 1000000, 1000000000];
let LICENSING_FEE = LF_table[LF_index];

const TECHNOLOGIES = {
    "wind": {
        name: "wind turbines",
        category: 1, // for colors

        cost: 5,
        income: .5,
        level_cost_increase: 1.3,
        level_income_increase: 1.1,

        current_level: 0,
    },
    "foodwaste": {
        name: "food waste ads",
        category: 2, // for colors

        cost: 10,
        income: 1,
        level_cost_increase: 2.0,
        level_income_increase: 1.5,

        current_level: 0,
    }
};

function updateLicenseFee() {
    if (LF_index < LF_table.length - 1) {
        LF_index++;
        LICENSING_FEE = LF_table[LF_index];
    } else {
        LICENSING_FEE *= LICENSING_FEE;
    }
}

function processTechUpgrade(tech_id) {
    let tech = TECHNOLOGIES[tech_id];

    GOOD_POINTS -= parseInt(tech.cost);
    GOOD_POINTS_PER_SEC += parseInt(tech.income);

    tech.current_level += 1;
    tech.cost *= tech.level_cost_increase;
    tech.income *= tech.level_income_increase;

    var li = document.getElementById("portfolio_" + tech_id);
    li.innerHTML = `${tech.name}: -${formatNumber(tech.cost)}$, +${formatNumber(tech.income)}$/s<br />
    
    ${"|".repeat(tech.current_level)}`;
    li.dataset.cost = tech.cost;
}

function upgradeTech(tech_id) {
    let tech = TECHNOLOGIES[tech_id];

    if (tech.cost > GOOD_POINTS) {
        return;
    }

    processTechUpgrade(tech_id);
    updateHtmlValues();
}

function addToPortfolio(tech_id) {
    let tech = TECHNOLOGIES[tech_id];

    let li = document.createElement("li");
    li.id = "portfolio_" + tech_id;
    li.classList.add("li_" + tech.category);

    li.addEventListener("click", function () {
        upgradeTech(tech_id);
    });

    document.getElementById("portfolio").appendChild(li);
}

function purchaseTech(tech_id) {
    let tech = TECHNOLOGIES[tech_id];

    if (tech.cost + LICENSING_FEE > GOOD_POINTS) {
        return;
    }
    addToPortfolio(tech_id);
    processTechUpgrade(tech_id);

    GOOD_POINTS -= parseInt(LICENSING_FEE);
    updateLicenseFee();

    document.getElementById("market_" + tech_id).style.display = "none"; // we cant flat out remove it from the DOM i think
    updateHtmlValues();
}

function addToMarketplace(tech_id) {
    let tech = TECHNOLOGIES[tech_id];

    let li = document.createElement("li");
    li.id = "market_" + tech_id;
    li.innerHTML = `${tech.name}: -${formatNumber(tech.cost)}$, +${formatNumber(tech.income)}$/s`;
    li.dataset.cost = tech.cost;
    li.dataset.is_market = true;
    li.classList.add("li_" + tech.category);

    li.addEventListener("click", function () {
        purchaseTech(tech_id);
    });

    document.getElementById("marketplace").appendChild(li);
}

for (const t in TECHNOLOGIES) {
    addToMarketplace(t);
}
// addToMarketplace("tech1", 1, 1);
// addToMarketplace("tech1", 2, 1);
// addToMarketplace("tech2", 5, 5);
// addToMarketplace("tech3", 10, 10);
// addToMarketplace("tech4", 10, 10);
// addToMarketplace("tech4", 20, 20);
// addToMarketplace("tech5", 50, 50);
// addToMarketplace("tech5", 100, 100);
// addToMarketplace("tech6", 200, 200);
// addToMarketplace("tech6", 500, 200);
// addToMarketplace("tech7", 1000, 1000);
// addToMarketplace("tech7", 2000, 1000);
// addToMarketplace("tech7", 5000, 1000);
// addToMarketplace("tech8", 10000, 10000);
// addToMarketplace("tech8", 20000, 10000);
// addToMarketplace("tech8", 50000, 10000);
// addToMarketplace("tech9", 100000, 100000);
// addToMarketplace("tech9", 200000, 100000);
// addToMarketplace("tech9", 500000, 100000);
// addToMarketplace("tech10", 1000000, 1000000);
// addToMarketplace("tech10", 2000000, 1000000);
// addToMarketplace("tech10", 5000000, 1000000);
// addToMarketplace("tech11", 10000000, 1000000);
// addToMarketplace("tech11", 20000000, 1000000);
// addToMarketplace("tech11", 50000000, 1000000);
// addToMarketplace("tech12", 100000000, 10000000); //100m