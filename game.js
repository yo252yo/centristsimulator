

let start_year = (new Date()).getFullYear();
let start_ts = (new Date()).getTime();

let s_points = 10;
let s_points_per_year = 1;

let c_points = 0;

let year = 0;
let ms_in_year = 1000;

let difficulty = 1;


function updateHtml() {
    document.getElementById("date").innerHTML = (start_year + year);
    document.getElementById("s_points").innerHTML = `Sustainability points: ${s_points}$, ${s_points_per_year}$/yr  `;
    document.getElementById("c_points").innerHTML = `Crisis points: ${c_points}`;

    document.getElementById("differencial").innerHTML = `Differential: ${s_points - c_points}`;

}
setInterval(updateHtml, 500);


function updateValues() {
    year++;
    s_points += s_points_per_year;
    c_points = Math.floor(difficulty * Math.pow(year, 4));
}
setInterval(updateValues, ms_in_year);
