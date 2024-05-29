
// ==================================================================
// Basic technologies

let LF_index = 0;
let LF_table = [1, 5, 10, 100, 1000, 50000, 1000000, 1000000000];
let LICENSING_FEE = LF_table[LF_index];

const TECHNOLOGIES = {
    "t1_1": {
        "name": "Wind Turbines",
        "category": 1,
        "cost": 5,
        "income": 1,
        "level_cost_increase": 1.1,
        "level_income_increase": 0.98,
        "current_level": 0,
        "tooltip": "Offshore or onshore, these buildings are a cheap and green source of energy."
    },
    "t1_2": {
        "name": "Food Waste Ads",
        "category": 2,
        "cost": 10,
        "income": 1,
        "level_cost_increase": 2,
        "level_income_increase": 1.3,
        "current_level": 0,
        "tooltip": "Advertising campaigns against food waste. Food waste is responsible for around 8% of global emissions."
    },
    "t1_3": {
        "name": "Carpooling",
        "category": 3,
        "cost": 20,
        "income": 2,
        "level_cost_increase": 5,
        "level_income_increase": 2,
        "current_level": 0,
        "tooltip": "Offer financial benefits and infrastructure for carpoolers."
    },
    "t1_4": {
        "name": "LED Lighting",
        "category": 4,
        "cost": 35,
        "income": 4,
        "level_cost_increase": 1.5,
        "level_income_increase": 0.7,
        "current_level": 0,
        "tooltip": "Replace conventional lightbulbs with LEDs that use 90% less energy."
    },
    "t1_5": {
        "name": "Silvopastures",
        "category": 5,
        "cost": 50,
        "income": 6,
        "level_cost_increase": 7,
        "level_income_increase": 1.2,
        "current_level": 0,
        "tooltip": "Build pastures with trees to sequester carbon."
    },
    "t1_6": {
        "name": "Clean Cooking",
        "category": 6,
        "cost": 100,
        "income": 10,
        "level_cost_increase": 20,
        "level_income_increase": 4,
        "current_level": 0,
        "tooltip": "Encourage people to cook with clean energies instead of wood and coal."
    },
    "t2_1": {
        "name": "Better Insulation",
        "category": 4,
        "cost": 500,
        "income": 50,
        "level_cost_increase": 1.5,
        "level_income_increase": 0.9,
        "current_level": 0,
        "tooltip": "Use better building materials to increase global adoption of insulation."
    },
    "t2_2": {
        "name": "Solar Panels",
        "category": 1,
        "cost": 1000,
        "income": 100,
        "level_cost_increase": 1.1,
        "level_income_increase": 0.6,
        "current_level": 0,
        "tooltip": "Building capturing a virtually unlimited, clean, and free energy source."
    },
    "t2_3": {
        "name": "Plant-rich Diet Ads",
        "category": 2,
        "cost": 1500,
        "income": 200,
        "level_cost_increase": 2,
        "level_income_increase": 0.3,
        "current_level": 0,
        "tooltip": "Encourage people to eat more vegetables through persuasive advertisement campaigns."
    },
    "t2_4": {
        "name": "Electric Cars",
        "category": 3,
        "cost": 2000,
        "income": 300,
        "level_cost_increase": 5,
        "level_income_increase": 0.1,
        "current_level": 0,
        "tooltip": "Make vehicles that are as green as your electricity production (plus production cost)."
    },
    "t2_5": {
        "name": "Peatland Protection",
        "category": 5,
        "cost": 3500,
        "income": 400,
        "level_cost_increase": 7,
        "level_income_increase": 1.3,
        "current_level": 0,
        "tooltip": "Protect peatland, a kind of marsh made of decomposing plant matter that store more carbon than forests."
    },
    "t3_1": {
        "name": "Refrigerant",
        "category": 4,
        "cost": 5000,
        "income": 500,
        "level_cost_increase": 1.5,
        "level_income_increase": 1.49,
        "current_level": 0,
        "tooltip": "Replace hydrofluorocarbons by alternative, less poluting refrigerants."
    },
    "t3_2": {
        "name": "Food Waste Subsidy",
        "category": 2,
        "cost": 7500,
        "income": 2000,
        "level_cost_increase": 1.1,
        "level_income_increase": 1.05,
        "current_level": 0,
        "tooltip": "Use government subsidies to incentivise good behavior. Food waste is responsible for around 8% of global emissions."
    },
    "t3_3": {
        "name": "Public Transport",
        "category": 3,
        "cost": 10000,
        "income": 6000,
        "level_cost_increase": 2.5,
        "level_income_increase": 1.8,
        "current_level": 0,
        "tooltip": "Multiply public transport options to relieve traffic and reduces the energy cost of movement."
    },
    "t3_4": {
        "name": "Family Planning",
        "category": 6,
        "cost": 15000,
        "income": 7500,
        "level_cost_increase": 20,
        "level_income_increase": 10,
        "current_level": 0,
        "tooltip": `"Family planning generates numerous benefits for maternal and child health, nutrition, and economic development, and contributes to gender equality, climate adaptation, and resilience."`
    },
    "t3_5": {
        "name": "Metal Recycling",
        "category": 4,
        "cost": 20000,
        "income": 20000,
        "level_cost_increase": 1.3,
        "level_income_increase": 1.05,
        "current_level": 0,
        "tooltip": "Use recycled metals instead of virgin materials to reduce their considerable extraction costs."
    },
    "t3_6": {
        "name": "Perennial Crops",
        "category": 5,
        "cost": 25000,
        "income": 30000,
        "level_cost_increase": 7,
        "level_income_increase": 2.6,
        "current_level": 0,
        "tooltip": "Plant crops with multiple year yield, as opposed to annual crops like maize and wheat."
    },
    "t3_7": {
        "name": "Plant-Based Diet Ads",
        "category": 2,
        "cost": 30000,
        "income": 40000,
        "level_cost_increase": 2,
        "level_income_increase": 1.2,
        "current_level": 0,
        "tooltip": "Encourage people to lower their meat consumption through persuasive advertisement campaigns."
    },
    "t3_8": {
        "name": "Bioplastics",
        "category": 4,
        "cost": 50000,
        "income": 50000,
        "level_cost_increase": 1.5,
        "level_income_increase": 1.01,
        "current_level": 0,
        "tooltip": "Replace plastic by alternatives made from biomass."
    },
    "t4_1": {
        "name": "Efficient Vehicles",
        "category": 3,
        "cost": 100000,
        "income": 10000,
        "level_cost_increase": 3,
        "level_income_increase": 2.5,
        "current_level": 0,
        "tooltip": "Improve the design of planes and trucks to be more energy efficient."
    },
    "t4_2": {
        "name": "Geothermal Plant",
        "category": 1,
        "cost": 150000,
        "income": 15000,
        "level_cost_increase": 1.1,
        "level_income_increase": 1.05,
        "current_level": 0,
        "tooltip": "Building that taps into underground reservoirs of hot water thanks to new technologies."
    },
    "t4_3": {
        "name": "Food Waste Bill",
        "category": 2,
        "cost": 200000,
        "income": 22000,
        "level_cost_increase": 2,
        "level_income_increase": 1.7,
        "current_level": 0,
        "tooltip": "Pass laws to forbid food waste. Food waste is responsible for around 8% of global emissions."
    },
    "t4_4": {
        "name": "Tropical Forest",
        "category": 5,
        "cost": 250000,
        "income": 30000,
        "level_cost_increase": 7,
        "level_income_increase": 4.5,
        "current_level": 0,
        "tooltip": "Restore forests that have been destroyed to restore their ability to sequester carbon."
    },
    "t4_5": {
        "name": "Universal Education",
        "category": 6,
        "cost": 500000,
        "income": 75000,
        "level_cost_increase": 18,
        "level_income_increase": 10,
        "current_level": 0,
        "tooltip": "Offer access to education in order to improved livelihoods, better economic opportunities, and encourage sustainable consumption."
    },
    "t4_6": {
        "name": "Alternative Cement",
        "category": 4,
        "cost": 1000000,
        "income": 250000,
        "level_cost_increase": 1.3,
        "level_income_increase": 0.7,
        "current_level": 0,
        "tooltip": "Use and develop alternatives to the common portland cement which emits a lot of carbon dioxide."
    },
    "t5_1": {
        "name": "Nuclear Plant",
        "category": 1,
        "cost": 5000000,
        "income": 500000,
        "level_cost_increase": 1.6,
        "level_income_increase": 0.6,
        "current_level": 0,
        "tooltip": "Extremely efficient energy generation building that requires a high level of safety and waste management."
    },
    "t5_2": {
        "name": "Plant Diet Subsidy",
        "category": 2,
        "cost": 10000000,
        "income": 750000,
        "level_cost_increase": 2.8,
        "level_income_increase": 0.5,
        "current_level": 0,
        "tooltip": "Use government subsidies to shift the ratio of meat to vegetable in stores and restaurants."
    },
    "t5_3": {
        "name": "Conservation Crops",
        "category": 5,
        "cost": 100000000,
        "income": 1000000,
        "level_cost_increase": 9,
        "level_income_increase": 0.9,
        "current_level": 0,
        "tooltip": "Use crop rotation, cover cropping, and reduced tillage to reduce emissions and sequester greenhouse."
    },
    "t5_4": {
        "name": "Walkable Cities",
        "category": 3,
        "cost": 1000000000,
        "income": 1500000,
        "level_cost_increase": 2.5,
        "level_income_increase": 2,
        "current_level": 0,
        "tooltip": "Increase walking by designing and retrofitting urban environments to encourage walking for transportation."
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
    if (nb_bars > 10) {
        nb_cross = Math.floor(nb_bars / 10);
        nb_bars -= nb_cross * 10;
    }
    var bars = "X".repeat(nb_cross) + "|".repeat(nb_bars);
    li.innerHTML = `
        <img src="../files/icon_cat_${tech.category}.png" class="portfolio_icon" />
        ${tech.name}<br />-${formatNumber(tech.cost)}$, +${formatNumber(tech.income)}$/s<br />    
    ${bars}`;
    li.dataset.cost = tech.cost;
    if (tech.tooltip) {
        li.title = tech.tooltip;
    }
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

    li.addEventListener("click", function (event) {
        upgradeTech(tech_id);
        event.stopPropagation();
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

function skip_market(event, tech_id) {
    event.stopPropagation();

    var elementToRemove = document.getElementById("market_" + tech_id);
    elementToRemove.parentNode.removeChild(elementToRemove);
    addToMarketplace(tech_id);
    displayAllPurchases();
}

function cancel_buy(event) {
    event.stopPropagation();
}

// ==================================================================
// Radical policies

const joker_policy = "[Type Your Radical Idea]";
let policies_purchased = 0;
let POLICIES_COOLDOWN = 0;
let POLICIES_COOLDOWN_MAX = 60;

const POLICIES = [
    //   "Severe Wealth Taxation",
    "Degrowth",
    "Participative Democracy",
    "Abolish Private Property",
    "Outlaw Planned Obsolescence",
    "Worldwide Governance",
    "Defund The Army",
    "Nationalize Tech Companies",
    joker_policy,
];

function addPolicyToPortfolio(policy, cost, reward) {
    let li = document.createElement("li");
    li.id = "portfolio_policy_" + policy;
    policies_purchased++;
    POLICIES_COOLDOWN_MAX = Math.max(9, parseInt(POLICIES_COOLDOWN_MAX) * .75);

    var policy_text = policy;
    if (policy == joker_policy) {
        li.id += "_" + policies_purchased;
        policy_text = document.getElementById("policy_input").value;
        while (policy_text == joker_policy) {
            policy_text = prompt(`Enter a "far left" radical proposal to change the world`);
        }
        document.getElementById("policy_input").value = joker_policy;
    }
    li.classList.add("li_7");

    li.innerHTML = `${policy_text}: +${formatNumber(reward)}$/s`;
    li.dataset.cost = 0;
    li.style.opacity = 0.6;

    document.getElementById("portfolio").appendChild(li);
}

var pityPolicyStreak = 0;
var maxPityStreakMechanism = 4;
function rewardForPolicy() {
    var lootbox_chance = Math.random();
    if (policies_purchased == 0) {
        lootbox_chance = 1; // First policy just works
    }

    if (lootbox_chance < 0.2 && pityPolicyStreak < maxPityStreakMechanism) { // bad outcome
        pityPolicyStreak++;
        return GOOD_POINTS_PER_SEC * Math.max(0.3 * Math.random(), 0.1);
    } else if (lootbox_chance < 0.4 && pityPolicyStreak < maxPityStreakMechanism) { // medium outcome, reimburse more or less 
        pityPolicyStreak++;
        return (0.5 * GOOD_POINTS_PER_SEC) * (0.6 + Math.random() * 1);
    } else if (lootbox_chance < 0.8 && pityPolicyStreak < maxPityStreakMechanism) { // good outcome, doubles
        pityPolicyStreak++;
        return GOOD_POINTS_PER_SEC * (1.5 + Math.random() * 5.5);
    } else { // best outcome, change order of magnitude
        pityPolicyStreak = 0;
        var base = 10;
        var oom_rng = Math.random();
        if (oom_rng < 0.1) {
            base = 2000;
        } else if (oom_rng < 0.3 || policies_purchased == 0) {
            base = 1000;
        } else if (oom_rng < 0.8) {
            base = 100;
        }

        return GOOD_POINTS_PER_SEC * base * (0.9 + 0.2 * Math.random());
    }
}

function purchasePolicy(policy) {
    if (POLICIES_COOLDOWN > 0) {
        return;
    }
    var reward = rewardForPolicy();
    GOOD_POINTS_PER_SEC /= 2;
    addPolicyToPortfolio(policy, GOOD_POINTS_PER_SEC, reward);
    GOOD_POINTS_PER_SEC += reward;

    if (policy != joker_policy) {
        var elementToRemove = document.getElementById("policy_" + policy);
        elementToRemove.parentNode.removeChild(elementToRemove);
    }
    POLICIES_COOLDOWN = POLICIES_COOLDOWN_MAX;
    updateHtmlValues();
}

// ==================================================================
// Setup

function addToMarketplace(tech_id) {
    let tech = TECHNOLOGIES[tech_id];

    let li = document.createElement("li");
    li.id = "market_" + tech_id;
    li.innerHTML = `
        <img src="../files/icon_cat_${tech.category}.png" class="marketplace_icon" />
        <span style="display:flex;float:left">${tech.name}</span>
        <span style="display:flex;float:right">
        <a onClick="skip_market(event, '${tech_id}')">
            SKIP
        </a></span>
        <br />
        -${formatNumber(tech.cost)}$, +${formatNumber(tech.income)}$/s
    `;
    li.dataset.cost = tech.cost;
    li.dataset.is_market = true;
    li.style.display = "none";
    li.classList.add("li_" + tech.category);

    li.addEventListener("click", function (event) {
        purchaseTech(tech_id);
        event.stopPropagation();
    });

    if (tech.tooltip) {
        li.title = tech.tooltip;
    }

    document.getElementById("marketplace").appendChild(li);
}

for (const t in TECHNOLOGIES) {
    addToMarketplace(t);
}

function addToPolicies(policy) {
    if (!CAN_WIN()) {
        return;
    }
    let li = document.createElement("li");
    li.id = "policy_" + policy;
    var policy_title = policy;

    if (policy == joker_policy) {
        policy_title = `<input type="text" id="policy_input" value="${joker_policy}" onClick="cancel_buy(event);" />`;
    }
    li.innerHTML = `${policy_title}<br /> -<span class="policyCost"></span>$/s, +????$/s`;
    li.dataset.cost = 0;
    li.classList.add("li_7");
    li.dataset.is_policy = true;

    li.addEventListener("click", function (event) {
        purchasePolicy(policy);
        event.stopPropagation();
    });

    document.getElementById("politics").appendChild(li);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

for (const t of shuffleArray(POLICIES)) {
    addToPolicies(t);
}