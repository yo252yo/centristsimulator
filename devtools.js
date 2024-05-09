
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
    GAME_PAUSED = true;

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


function bestrun() {
    GAME_PAUSED = true;
    var start = 0;
    let cash = milestone[start].cash;
    let income = milestone[start].income;
    let local_lfindex = 0;
    let license_price = LF_table[local_lfindex];

    for (var i = start; i < 301; i++) {
        cash += income;

        var best = 0;
        var argbest = "";
        for (var t in TECHNOLOGIES) {
            var tech = TECHNOLOGIES[t];
            var license = 0;
            if (tech.current_level == 0) {
                license += license_price;
            }
            var gain = tech.income / (tech.cost + license);
            if (gain > best) {
                best = gain;
                argbest = tech;
            }
        }
        if (cash > argbest.cost) {
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
        if ([10, 30, 60, 90, 120, 240, 300].includes(i)) {
            console.log(`At ${i}: $${formatNumber(cash)} (+${formatNumber(income)}$/s)`);
        }
    }
}
