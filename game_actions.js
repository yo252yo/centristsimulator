
// ==================================================================
// Basic technologies

let LF_index = 0;
let LF_table = [1, 5, 10, 100, 1000, 50000, 1000000, 1000000000];
let LICENSING_FEE = LF_table[LF_index];

const TECHNOLOGIES = {
    "t1_1": {
        "name": "wind turbines",
        "category": 1,
        "cost": 5,
        "income": 1,
        "level_cost_increase": 1.1,
        "level_income_increase": 0.98,
        "current_level": 0
    },
    "t1_2": {
        "name": "food waste ads",
        "category": 2,
        "cost": 10,
        "income": 1,
        "level_cost_increase": 2,
        "level_income_increase": 1.3,
        "current_level": 0
    },
    "t1_3": {
        "name": "carpooling ads",
        "category": 3,
        "cost": 20,
        "income": 2,
        "level_cost_increase": 5,
        "level_income_increase": 2,
        "current_level": 0
    },
    "t1_4": {
        "name": "LEDs",
        "category": 4,
        "cost": 35,
        "income": 4,
        "level_cost_increase": 1.5,
        "level_income_increase": 0.7,
        "current_level": 0
    },
    "t1_5": {
        "name": "silvopastures",
        "category": 5,
        "cost": 50,
        "income": 6,
        "level_cost_increase": 7,
        "level_income_increase": 1.2,
        "current_level": 0
    },
    "t1_6": {
        "name": "clean cooking",
        "category": 6,
        "cost": 100,
        "income": 10,
        "level_cost_increase": 20,
        "level_income_increase": 4,
        "current_level": 0
    },
    "t2_1": {
        "name": "improve insulation",
        "category": 4,
        "cost": 500,
        "income": 50,
        "level_cost_increase": 1.5,
        "level_income_increase": 0.9,
        "current_level": 0
    },
    "t2_2": {
        "name": "solar panels",
        "category": 1,
        "cost": 1000,
        "income": 100,
        "level_cost_increase": 1.1,
        "level_income_increase": 0.6,
        "current_level": 0
    },
    "t2_3": {
        "name": "veganism ads",
        "category": 2,
        "cost": 1500,
        "income": 200,
        "level_cost_increase": 2,
        "level_income_increase": 0.3,
        "current_level": 0
    },
    "t2_4": {
        "name": "electric cars",
        "category": 3,
        "cost": 2000,
        "income": 300,
        "level_cost_increase": 5,
        "level_income_increase": 0.1,
        "current_level": 0
    },
    "t2_5": {
        "name": "peatland protection",
        "category": 5,
        "cost": 3500,
        "income": 400,
        "level_cost_increase": 7,
        "level_income_increase": 1.3,
        "current_level": 0
    },
    "t3_1": {
        "name": "refrigerant",
        "category": 4,
        "cost": 5000,
        "income": 500,
        "level_cost_increase": 1.5,
        "level_income_increase": 1.49,
        "current_level": 0
    },
    "t3_2": {
        "name": "food waste subsidy",
        "category": 2,
        "cost": 7500,
        "income": 2000,
        "level_cost_increase": 1.1,
        "level_income_increase": 1.05,
        "current_level": 0
    },
    "t3_3": {
        "name": "more public transport",
        "category": 3,
        "cost": 10000,
        "income": 6000,
        "level_cost_increase": 2.5,
        "level_income_increase": 1.8,
        "current_level": 0
    },
    "t3_4": {
        "name": "Family planning",
        "category": 6,
        "cost": 15000,
        "income": 7500,
        "level_cost_increase": 20,
        "level_income_increase": 10,
        "current_level": 0
    },
    "t3_5": {
        "name": "metal recycling",
        "category": 4,
        "cost": 20000,
        "income": 20000,
        "level_cost_increase": 1.3,
        "level_income_increase": 1.05,
        "current_level": 0
    },
    "t3_6": {
        "name": "Perennial Staple Crops",
        "category": 5,
        "cost": 25000,
        "income": 30000,
        "level_cost_increase": 7,
        "level_income_increase": 2.6,
        "current_level": 0
    },
    "t3_7": {
        "name": "Plant based diet subsidy",
        "category": 2,
        "cost": 30000,
        "income": 40000,
        "level_cost_increase": 2,
        "level_income_increase": 1.2,
        "current_level": 0
    },
    "t3_8": {
        "name": "bioplastics",
        "category": 4,
        "cost": 50000,
        "income": 50000,
        "level_cost_increase": 1.5,
        "level_income_increase": 1.01,
        "current_level": 0
    },
    "t4_1": {
        "name": "Rnd for efficient vehicles",
        "category": 3,
        "cost": 100000,
        "income": 10000,
        "level_cost_increase": 3,
        "level_income_increase": 2.5,
        "current_level": 0
    },
    "t4_2": {
        "name": "Geothermal plant",
        "category": 1,
        "cost": 150000,
        "income": 15000,
        "level_cost_increase": 1.1,
        "level_income_increase": 1.05,
        "current_level": 0
    },
    "t4_3": {
        "name": "Food waste law",
        "category": 2,
        "cost": 200000,
        "income": 22000,
        "level_cost_increase": 2,
        "level_income_increase": 1.7,
        "current_level": 0
    },
    "t4_4": {
        "name": "Tropical Forest Restoration",
        "category": 5,
        "cost": 250000,
        "income": 30000,
        "level_cost_increase": 7,
        "level_income_increase": 4.5,
        "current_level": 0
    },
    "t4_5": {
        "name": "universal education",
        "category": 6,
        "cost": 500000,
        "income": 75000,
        "level_cost_increase": 18,
        "level_income_increase": 10,
        "current_level": 0
    },
    "t4_6": {
        "name": "Alternative cement",
        "category": 4,
        "cost": 1000000,
        "income": 250000,
        "level_cost_increase": 1.3,
        "level_income_increase": 0.7,
        "current_level": 0
    },
    "t5_1": {
        "name": "Nuclear plant",
        "category": 1,
        "cost": 5000000,
        "income": 500000,
        "level_cost_increase": 1.6,
        "level_income_increase": 0.6,
        "current_level": 0
    },
    "t5_2": {
        "name": "Plant based diet law",
        "category": 2,
        "cost": 10000000,
        "income": 750000,
        "level_cost_increase": 2.8,
        "level_income_increase": 0.5,
        "current_level": 0
    },
    "t5_3": {
        "name": "Forbid monoculture",
        "category": 5,
        "cost": 100000000,
        "income": 1000000,
        "level_cost_increase": 9,
        "level_income_increase": 0.9,
        "current_level": 0
    },
    "t5_4": {
        "name": "5 minute city/bike infra",
        "category": 3,
        "cost": 1000000000,
        "income": 1500000,
        "level_cost_increase": 2.5,
        "level_income_increase": 2,
        "current_level": 0
    }
};

function processTechUpgrade(tech_id) {
    let tech = TECHNOLOGIES[tech_id];

    GOOD_POINTS -= parseInt(tech.cost);
    GOOD_POINTS_PER_SEC += parseInt(tech.income);

    tech.current_level += 1;
    tech.cost *= tech.level_cost_increase;
    tech.income *= tech.level_income_increase;

    var li = document.getElementById("portfolio_" + tech_id);

    var nb_bars = tech.current_level;
    var nb_cross = 0;
    if (nb_bars > 20) {
        nb_cross = Math.floor(nb_bars / 10);
        nb_bars -= nb_cross * 10;
    }
    var bars = "X".repeat(nb_cross) + "|".repeat(nb_bars);
    li.innerHTML = `${tech.name}: -${formatNumber(tech.cost)}$, +${formatNumber(tech.income)}$/s<br />    
    ${bars}`;
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

function updateLicenseFee() {
    if (LF_index < LF_table.length - 1) {
        LF_index++;
        LICENSING_FEE = LF_table[LF_index];
    } else {
        LICENSING_FEE *= LICENSING_FEE;
    }
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

    var elementToRemove = document.getElementById("market_" + tech_id);
    elementToRemove.parentNode.removeChild(elementToRemove);
    updateHtmlValues();
}

// ==================================================================
// Setup

function addToMarketplace(tech_id) {
    let tech = TECHNOLOGIES[tech_id];

    let li = document.createElement("li");
    li.id = "market_" + tech_id;
    li.innerHTML = `${tech.name}:<br /> -${formatNumber(tech.cost)}$, +${formatNumber(tech.income)}$/s`;
    li.dataset.cost = tech.cost;
    li.dataset.is_market = true;
    li.style.display = "none";
    li.classList.add("li_" + tech.category);

    li.addEventListener("click", function () {
        purchaseTech(tech_id);
    });

    document.getElementById("marketplace").appendChild(li);
}

for (const t in TECHNOLOGIES) {
    addToMarketplace(t);
}