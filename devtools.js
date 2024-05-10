
GAME_PAUSED = true;

let expected_cash = [];
let milestone = {
    0: {
        cash: 10,
        income: 10,
    },
    30: {
        cash: 200,
        income: 25,
    },
    60: {
        cash: 500,
        income: 40,
    },
    120: {
        cash: 1000,
        income: 500,
    },
    180: {
        cash: 50000,
        income: 5000,
    },
    240: {
        cash: 1000000,
        income: 750000,
    },
    300: {
        cash: 1000000000,
        income: 500000000,
    },
};


function r() {
    window.location.href = window.location.href;
}

function evalTech(tech_id, start) {
    start = start || 0;
    let tech = TECHNOLOGIES[tech_id];
    if (!start in milestone) {
        console.log("INVALID START TIME");
        return;
    }
    let cash = milestone[start].cash;
    let income = milestone[start].income;

    for (var i = start; i < 301; i++) {
        cash += income;
        if (cash > tech.cost) {
            cash -= tech.cost;
            income += tech.income;
            tech.cost *= tech.level_cost_increase;
            tech.income *= tech.level_income_increase;
        }
        if ([10, 30, 60, 90, 120, 240, 300].includes(i)) {
            console.log(`At ${i}: $${formatNumber(cash)} (+${formatNumber(income)}$/s)`);
        }
    }
}

// ==============================================================================
// ==============================================================================
// ==============================================================================
// HEURISTIC

function heuristic(start, start_cash, start_income, start_local_lfindex, start_techtree) {
    var tech_tree = start_techtree || Object.assign({}, TECHNOLOGIES);
    for (var t in tech_tree) {
        tech_tree[t] = Object.assign({}, tech_tree[t]);
    }

    var start = start || 0;
    let cash = start_cash || milestone[start].cash;
    let income = start_income || milestone[start].income;
    let local_lfindex = start_local_lfindex || 0;
    let license_price = LF_table[local_lfindex];

    for (var i = start; i < 91; i++) {
        cash += income;

        purchased = true;
        while (purchased) {
            var best = 0;
            var argbest = "";
            var bestnow = 0;
            for (var t in tech_tree) {
                var tech = tech_tree[t];
                var license = 0;
                if (tech.current_level == 0) {
                    license += license_price;
                }
                var cost = (tech.cost + license);
                if (cost < cash) {
                    if (tech.income > bestnow) {
                        bestnow = tech.income;
                    }
                }
            }

            for (var t in tech_tree) {
                var tech = tech_tree[t];
                var license = 0;
                if (tech.current_level == 0) {
                    license += license_price;
                }
                var cost = (tech.cost + license);
                if (cost > cash) {
                    // add the miss from waiting
                    var wait = (cost - cash) / income;
                    cost += bestnow * wait;
                }
                var gain = tech.income / cost;

                if (gain > best) {
                    best = gain;
                    argbest = tech;
                }
            }

            purchased = false;
            if (cash > argbest.cost) {
                purchased = true;
                console.log(".    PURCHASE: " + argbest.name + argbest.current_level);
                cash -= argbest.cost;
                income += argbest.income;
                argbest.cost *= argbest.level_cost_increase;
                argbest.income *= argbest.level_income_increase;
                argbest.current_level += 1;

                if (argbest.current_level == 1) {
                    local_lfindex++;
                    license_price = LF_table[local_lfindex];
                }
            }
        }
        if ([10, 30, 60, 90, 120, 240, 300].includes(i)) {
            console.log(`At ${i}: $${formatNumber(cash)} (+${formatNumber(income)}$/s)`);
        }
    }
}

function heuristic_with(tech_id) {
    var tech_tree = Object.assign({}, TECHNOLOGIES);
    for (var t in tech_tree) {
        tech_tree[t] = Object.assign({}, tech_tree[t]);
    }
    let tech = tech_tree[tech_id];
    let cash = milestone[0].cash;
    let income = milestone[0].income;

    for (var i = 0; i < 301; i++) {
        cash += income;
        if (cash > tech.cost) {
            cash -= tech.cost;
            income += tech.income;
            tech.cost *= tech.level_cost_increase;
            tech.income *= tech.level_income_increase;
            tech.current_level += 1;
            heuristic(i, cash, income, 1, tech_tree);
            return;
        }
    }
}

// ==============================================================================
// ==============================================================================
// ==============================================================================
// TRY ALL STRATS


var STOP_AT = 60;
var START_CASH = 1;
var START_INCOME = 10;

function try_strat(strat, timestamp_end) {
    var costs = [];
    var incomes = [];
    var levels = [];
    if (costs.length == 0) { // populate from tech tree
        var techs = Object.values(TECHNOLOGIES);
        for (let i in techs) {
            costs[i] = techs[i].cost;
            incomes[i] = techs[i].income;
            levels[i] = 0;
        }
    }

    var cash = START_CASH;
    var income = START_INCOME;
    var current_license = 0;

    var strat_index = 0;

    for (var t = 0; t <= timestamp_end; t++) {
        cash += income;
        if (strat_index > strat.length - 1) {
            throw "Insufficient strat;"
        }

        var next = strat[strat_index];

        var purchased = true;
        var incremented = false;
        while (purchased) {
            purchased = false;

            var cost = costs[next];
            if (levels[next] == 0) {
                cost += LF_table[current_license];
            }
            if (cost <= cash) {
                if (levels[next] == 0) {
                    current_license++;
                }
                cash -= cost;
                income += incomes[next];
                incomes[next] *= techs[next].level_income_increase;
                costs[next] *= techs[next].level_cost_increase;
                purchased = true;

                if (!incremented) {
                    incremented = true;
                    strat_index++;
                }
            }
        }
    }

    return income;
}

var ALL_STRATS = {};
function try_all_strat(prefix) {
    var strat = prefix || "";
    for (var s = 0; s <= 5; s++) {
        try {
            var r = try_strat(strat + s, STOP_AT);
            ALL_STRATS[(strat + s)] = r;
        } catch (e) {
            try_all_strat(strat + s);
        }
    }
}
try_all_strat();
console.log(ALL_STRATS);



function evaluate_percentiles(filter, invert) {
    var filteredKeys = Object.keys(ALL_STRATS);
    if (filter) {
        filteredKeys = Object.keys(ALL_STRATS).filter(function (key) {
            if (!invert) {
                return key.includes(filter);
            } else {
                return !(key.includes(filter));
            }
        });
    }

    var filteredIncomes = filteredKeys.map(function (key) {
        return ALL_STRATS[key];
    });

    filteredIncomes.sort(function (a, b) {
        return a - b;
    });
    console.log("99%: " + filteredIncomes[Math.floor(filteredIncomes.length * 0.99)].toFixed(1) +
        " - \t90%: " + filteredIncomes[Math.floor(filteredIncomes.length * 0.90)].toFixed(1) +
        " - \t80%: " + filteredIncomes[Math.floor(filteredIncomes.length * 0.80)].toFixed(1) +
        " - \t50%: " + filteredIncomes[Math.floor(filteredIncomes.length * 0.50)].toFixed(1));
}

console.log("TOTAL: ");
evaluate_percentiles();
for (var i = 0; i <= 5; i++) {
    console.log("=========== TECH " + i);
    evaluate_percentiles(i);
    evaluate_percentiles(i, true);
}