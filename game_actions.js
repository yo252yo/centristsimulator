
let LF_index = 0;
let LF_table = [1, 5, 10, 100, 1000, 50000, 1000000, 1000000000];
let LICENSING_FEE = LF_table[LF_index];

const TECHNOLOGIES = {
    // ===========================================================
    // ===========================================================
    // TIER 1
    "t0": {
        name: "wind turbines",
        category: 1,

        cost: 5,
        income: .5,
        level_cost_increase: 1.1,
        level_income_increase: 1.01,

        current_level: 0,
    },
    "t1": {
        name: "food waste ads",
        category: 2,

        cost: 10,
        income: 1,
        level_cost_increase: 2.0,
        level_income_increase: 1.4,

        current_level: 0,
    },
    "t2": {
        name: "carpooling ads",
        category: 3,

        cost: 20,
        income: 2,
        level_cost_increase: 10,
        level_income_increase: 2.5,

        current_level: 0,
    },
    "t3": {
        name: "improve insulation",
        category: 4,

        cost: 35,
        income: 4,
        level_cost_increase: 1.5,
        level_income_increase: 0.7,

        current_level: 0,
    },
    "t4": {
        name: "silvopastures",
        category: 5,

        cost: 50,
        income: 6,
        level_cost_increase: 7,
        level_income_increase: 1.2,

        current_level: 0,
    },
    "t5": {
        name: "clean cooking",
        category: 6,

        cost: 100,
        income: 10,
        level_cost_increase: 20,
        level_income_increase: 5,

        current_level: 0,
    },

    // ===========================================================
    // ===========================================================
    // TIER 2
    "t6": {
        name: "LEDs",
        category: 4,

        cost: 100,
        income: 30,
        level_cost_increase: 1.4,// from 1.5
        level_income_increase: 0.95,// from .7

        current_level: 0,
    },
    "t7": {
        name: "solar panels",
        category: 1,

        cost: 150,
        income: 35,
        level_cost_increase: 1.1, //1.15 from 1.1
        level_income_increase: .8,//.95 from 1.01

        current_level: 0,
    },
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