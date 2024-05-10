
GAME_PAUSED = true;

function convertToCSV(obj) {
    const headers = Object.keys(obj[Object.keys(obj)[0]]);
    const rows = Object.values(obj).map(item => headers.map(header => item[header]));
    rows.unshift(headers);
    return rows.map(row => row.join(',')).join('\n');
}

const csvData = convertToCSV(TECHNOLOGIES);
console.log(csvData);

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

const importedObject = convertToObject(csvData);
console.log(importedObject);
