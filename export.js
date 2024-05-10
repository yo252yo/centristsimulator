
GAME_PAUSED = true;

function convertToCSV(obj) {
    const headers = Object.keys(obj[Object.keys(obj)[0]]);
    const rows = Object.values(obj).map(item => headers.map(header => item[header]));
    rows.unshift(headers);
    return rows.map(row => row.join(',')).join('\n');
}

const csvData = convertToCSV(TECHNOLOGIES);
console.log(csvData);



const csvData2 = `name,category,cost,income,level_cost_increase,level_income_increase,current_level
wind turbines,1,5,1,1.1,0.98,0
food waste ads,2,10,1,2,1.3,0
carpooling ads,3,20,2,5,2,0
LEDs,4,35,4,1.5,0.7,0
silvopastures,5,50,6,7,1.2,0
clean cooking,6,100,10,20,4,0
improve insulation,4,500,50,1.5,0.9,0
solar panels,1,1.0K,100,1.1,0.6,0
veganism ads,2,1.5K,200,2,0.3,0
electric cars,3,2.0K,300,5,0.1,0
peatland protection,5,3.5K,400,7,1.3,0
refrigerant,4,5.0K,500,1.5,1.49,0
food waste subsidy,2,7.5K,2.0K,1.1,1.05,0
more public transport,3,10.0K,6.0K,2.5,1.8,0
Family planning,6,15.0K,7.5K,20,10,0
metal recycling,4,20.0K,20.0K,1.3,1.05,0
Perennial Staple Crops,5,25.0K,30.0K,7,2.6,0
Plant based diet subsidy,2,30.0K,40.0K,2,1.2,0
bioplastics,4,50.0K,50.0K,1.5,1.01,0
Rnd for efficient vehicles,3,100.0K,10.0K,3,2.5,0
Geothermal plant,1,150.0K,15.0K,1.1,1.05,0
Food waste law,2,200.0K,22.0K,2,1.7,0
Tropical Forest Restoration,5,250.0K,30.0K,7,4.5,0
universal education,6,500.0K,75.0K,18,10,0
Alternative cement,4,1.0M,250.0K,1.3,0.7,0
Nuclear plant,1,5.0M,500.0K,1.6,0.6,0
Plant based diet law,2,10.0M,750.0K,2.8,0.5,0
Forbid monoculture,5,100.0M,1.0M,9,0.9,0
5 minute city/bike infra,3,1000.0M,1.5M,2.5,2,0`;

function convertToObject(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = {};

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j].trim();
        }
        result[`t${i}`] = obj;
    }
    return result;
}

const importedObject = convertToObject(csvData2);
console.log(importedObject);
console.log(JSON.stringify(importedObject, null, 4));