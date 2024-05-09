
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
        if ([10, 30, 60, 120, 240, 300].includes(i)) {
            console.log(`At ${i}: $${formatNumber(cash)} (+${formatNumber(income)}$/s)`);
        }
    }
}
