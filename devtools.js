
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
    let tech = Object.assign({}, Object.values(TECHNOLOGIES)[tech_id]);
    if (!start in milestone) {
        console.log("INVALID START TIME");
        return;
    }
    let cash = milestone[start].cash;
    let income = milestone[start].income;

    for (var i = start; i < 601; i++) {
        cash += income;
        if (cash > tech.cost) {
            cash -= tech.cost;
            income += tech.income;
            tech.cost *= tech.level_cost_increase;
            tech.income *= tech.level_income_increase;
        }
        if ([10, 60, 120, 240, 300, 450, 600].includes(i)) {
            console.log(`At ${i}: $${formatNumber(cash)} (+${formatNumber(income)}$/s)`);
        }
    }
}

// ==============================================================================
// ==============================================================================
// ==============================================================================
// TRY ALL STRATS

var MAX_ACTIONS_IN_STRAT = 8;
var STOP_AT = 60;
var START_CASH = 1; //600, [100 - 1000]
var START_INCOME = 8; //33, [15-50]
var START_LICENSE = 0;

var TRY_FIRST_N_TECH = Object.keys(TECHNOLOGIES).length;


var init_costs = [];
var init_incomes = [];
var init_levels = [];

var techs = Object.values(TECHNOLOGIES);
for (let i in techs) {
    init_costs[i] = techs[i].cost;
    init_incomes[i] = techs[i].income;
    init_levels[i] = 0;
}

function numberToLetter(number) {
    return String.fromCharCode(number + 97); // Adding 96 to convert 1 to 'a', 2 to 'b', and so on
}
function letterToNumber(letter) {
    return letter.charCodeAt(0) - 97; // Subtracting 96 to convert 'a' to 1, 'b' to 2, and so on
}


function try_strategy_from_string(str_strategy) {
    var costs = Array.from(init_costs);
    var incomes = Array.from(init_incomes);
    var levels = Array.from(init_levels);

    var cash = START_CASH;
    var income = START_INCOME;
    var current_license = START_LICENSE;

    var t = 0;
    for (var s of str_strategy) {
        var next_purchase = letterToNumber(s);



        var next_cost = parseInt(costs[next_purchase]);
        if (levels[next_purchase] == 0) {
            next_cost += parseInt(LF_table[current_license]);
        }

        var time_to_pay = Math.max(1, Math.ceil((next_cost - cash) / income));
        t += time_to_pay;
        if (t > STOP_AT) {
            throw "This strategy is too long";
        }

        cash += time_to_pay * income;
        cash -= next_cost;

        income += incomes[next_purchase];
        incomes[next_purchase] *= techs[next_purchase].level_income_increase;
        costs[next_purchase] *= techs[next_purchase].level_cost_increase;

        if (levels[next_purchase] == 0) {
            current_license++;
        }
        levels[next_purchase]++;
    }
    cash += income * (STOP_AT - t);
    return income;
}

function try_strategy_extentions(current_strat) {
    var results = {};
    for (let i = 0; i < techs.length; i++) {
        var potential_extention = current_strat + numberToLetter(i);
        try {
            var value = try_strategy_from_string(potential_extention);
            results[potential_extention] = value;
            if (potential_extention.length < MAX_ACTIONS_IN_STRAT) {
                Object.assign(results, try_strategy_extentions(potential_extention));
            }
        } catch (e) { } //unfeasable strategies
    }
    return results;
}

var res = try_strategy_extentions("");
console.log(res);
console.log(Object.keys(res).length);



/*



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
    var current_license = START_LICENSE;

    var strat_index = 0;

    for (var t = 0; t <= timestamp_end; t++) {
        cash += income;
        if (strat_index > strat.length - 1) {
            throw "Insufficient strat;"
        }

        var next = strat[strat_index] - 1;

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
    for (var s = 1; s < 10; s++) {
        try {
            var r = try_strat(strat + s, STOP_AT);
            ALL_STRATS[(strat + s)] = r;
        } catch (e) {
            try_all_strat(strat + s);
        }
    }
}


// /*
try_all_strat();
console.log(ALL_STRATS);



function evaluate_percentiles(filter, invert) {
    var filteredKeys = Object.keys(ALL_STRATS);
    if (filter) {
        filteredKeys = Object.keys(ALL_STRATS).filter(function (key) {
            if (!invert) {
                return key.includes(filter.toString());
            } else {
                return !(key.includes(filter.toString()));
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
        " - \t50%: " + filteredIncomes[Math.floor(filteredIncomes.length * 0.50)].toFixed(1) +
        " - \tspread: " + (filteredIncomes[Math.floor(filteredIncomes.length * 0.80)] / filteredIncomes[Math.floor(filteredIncomes.length * 0.99)]).toFixed(1) +
        " - \tpop: " + filteredIncomes.length
    );
    return filteredIncomes[Math.floor(filteredIncomes.length * 0.90)];
}

console.log("TOTAL: ");
evaluate_percentiles();
var techs = Object.values(TECHNOLOGIES);
for (var i = 1; i < 10; i++) {
    console.log("=========== TECH " + i + " " + techs[i - 1].name);
    var withit = evaluate_percentiles(i);
    var without = evaluate_percentiles(i, true);

    console.log("WORTH FACTOR:" + Math.abs(withit / without).toFixed(2));
}

// */